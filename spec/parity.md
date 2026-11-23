# Feature parity

Status of every [feature](README.md#features) on every platform. Update the row in the same pull
request (or right after the release) that changes a status. The
[project board](process.md#the-project-board) shows the same thing per issue; this table is the
summary people read.

✅ released (first version) · 🚧 in progress · 📋 planned · ➖ not applicable

| Feature                                                                    | Browser extension | Android                                                                       | Desktop | iOS |
| -------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------- | ------- | --- |
| [Autofill from every unlocked account](features/multi-account-autofill.md) | ✅ 2026.11.0.2    | 🚧 [android#1](https://github.com/multiwarden/android/pull/1)                 | 📋      | 📋  |
| [Account for autofill on page load](features/page-load-account.md)         | ✅ 2026.11.0.2    | ➖                                                                            | ➖      | ➖  |
| [Choosing the account when saving](features/save-account-picker.md)        | ✅ 2026.11.0.2    | 📋                                                                            | ➖      | 📋  |
| [Passkeys from every unlocked account](features/multi-account-passkeys.md) | ✅ 2026.11.0.2    | 📋                                                                            | 📋      | 📋  |
| [TOTP from the item's own account](features/multi-account-totp.md)         | ✅ 2026.11.0.2    | 🚧 [android#1](https://github.com/multiwarden/android/pull/1)                 | 📋      | 📋  |
| [Every screen says which account](features/account-labels.md)              | ✅ 2026.11.0.2    | 🚧 [android#1](https://github.com/multiwarden/android/pull/1) (autofill only) | 📋      | 📋  |
| [Combined vault](features/combined-vault.md)                               | ✅ 2026.11.0.2    | 📋                                                                            | 📋      | 📋  |
| [Multiwarden settings](features/multiwarden-settings.md)                   | ✅ 2026.11.0.2    | 📋                                                                            | 📋      | 📋  |
| [Hide Premium notices](features/hide-premium-notices.md)                   | ✅ 2026.11.0.2    | 📋                                                                            | 📋      | 📋  |
| [Installs next to Bitwarden](features/side-by-side-install.md)             | ✅ 2026.11.0.2    | 🚧 [android#1](https://github.com/multiwarden/android/pull/1)                 | 📋      | 📋  |

The extension column covers Chrome, Edge, Opera, Vivaldi, Brave and Firefox; Safari has an
unsigned build only. "2026.11.0.2" is the first public GitHub release; earlier builds were not
published.

## Project infrastructure

Not features users see, but every platform needs them to keep up with Bitwarden.

| Item                                                              | Browser extension               | Android                                                       | Desktop | iOS |
| ----------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------- | ------- | --- |
| Nightly sync with Bitwarden's releases                            | ✅                              | 🚧 [android#1](https://github.com/multiwarden/android/pull/1) | 📋      | 📋  |
| CI check that no `Multiwarden:` hook goes missing                 | ✅                              | 🚧 [android#1](https://github.com/multiwarden/android/pull/1) | 📋      | 📋  |
| Versioning: Bitwarden version plus release number                 | ✅                              | 🚧 [android#1](https://github.com/multiwarden/android/pull/1) | 📋      | 📋  |
| Releases from the Actions tab                                     | ✅                              | 🚧 [android#1](https://github.com/multiwarden/android/pull/1) | 📋      | 📋  |
| Store publishing                                                  | ✅ Chrome Web Store (automatic) | 📋 F-Droid / Google Play                                      | 📋      | 📋  |
| Spec links in release notes ([process](process.md#release-notes)) | 📋                              | 📋                                                            | 📋      | 📋  |
