#!/usr/bin/env bash
# Builds the Multiwarden F-Droid repository into site/dist/fdroid/repo, from the APKs of the
# latest multiwarden/android release. Run from the repository root after the site is built.
#
# Needs: fdroidserver, apksigner (Android build-tools), gh, and these environment variables:
#   FDROID_KEYSTORE_BASE64    the repository signing keystore (PKCS12), base64-encoded
#   FDROID_KEYSTORE_PASSWORD  its store and key password
#   ANDROID_METADATA          a checkout of fastlane/metadata/android from multiwarden/android
#   GH_TOKEN                  to download the release
set -euo pipefail

root="$(pwd)"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

cp fdroid/config.yml "$work/config.yml"
cp -r fdroid/metadata "$work/metadata"
cp logo/logo512.png "$work/repo-icon.png"
mkdir -p "$work/metadata/com.multiwarden.android" "$work/repo" "$work/archive/icons"
# fdroid update also writes an (empty) archive index and needs an icon for it.
cp logo/logo512.png "$work/archive/icons/icon.png"
cp -r "$ANDROID_METADATA"/. "$work/metadata/com.multiwarden.android/"

echo "$FDROID_KEYSTORE_BASE64" | base64 --decode > "$work/keystore.p12"
{
  echo "keystore: keystore.p12"
  echo "keystorepass: $FDROID_KEYSTORE_PASSWORD"
  echo "keypass: $FDROID_KEYSTORE_PASSWORD"
  if [ -n "${ANDROID_HOME:-}" ]; then
    apksigner="$(ls "$ANDROID_HOME"/build-tools/*/apksigner | sort -V | tail -n 1)"
    echo "apksigner: $apksigner"
  fi
} >> "$work/config.yml"
chmod 600 "$work/config.yml"

# The per-CPU APKs (multiwarden-<version>-<cpu>.apk) when the release has them; F-Droid clients
# pick the one that matches the device. Older releases only have the universal APK.
gh release download --repo multiwarden/android --pattern 'multiwarden-*.apk' --dir "$work/repo"
if ls "$work"/repo/multiwarden-*-*.apk > /dev/null 2>&1; then
  find "$work/repo" -name 'multiwarden-*.apk' ! -name 'multiwarden-*-*.apk' -delete
fi
ls -l "$work/repo"

(cd "$work" && fdroid update --pretty)

mkdir -p "$root/site/dist/fdroid"
rm -rf "$root/site/dist/fdroid/repo"
cp -r "$work/repo" "$root/site/dist/fdroid/repo"
