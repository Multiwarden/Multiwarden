# Installs next to Bitwarden

**ID:** `side-by-side-install` · **Status:** see [parity](../parity.md)

## What the user gets

Multiwarden installs as its own app, with its own name and icon, next to the official Bitwarden
app, so the user can try it without giving up Bitwarden.

## Rules

1. Its own application or extension ID, name "Multiwarden" and the keyhole icon on indigo.
2. Version is Bitwarden's version plus a Multiwarden release number, for example `2026.11.0.2`.
3. The About section and store listings say that Multiwarden is not affiliated with Bitwarden.
4. Only open-source (GPL) code is built and distributed, never `bitwarden_license/` code.

## Platform notes

### Browser extension

Branding is applied to the built extension by `multiwarden/scripts/brand-build.mjs`; Firefox ID
`multiwarden@mteij.nl`; fixed Chromium ID for unpacked installs.

### Android

Application ID `com.multiwarden.android`, F-Droid flavor only, set in `multiwarden/multiwarden.gradle`.

### Desktop

App ID `com.multiwarden.desktop`, name "Multiwarden", own data folder. Its own native messaging
host (`com.multiwarden.desktop`), IPC and SSH agent sockets, biometric key entries and autostart
entry, so it runs next to Bitwarden's desktop app. `bitwarden://` links are only taken when
Bitwarden doesn't handle them. No self-update. Branding by `multiwarden/scripts/brand-desktop.mjs`.
On Windows only one app can serve the SSH agent pipe.
