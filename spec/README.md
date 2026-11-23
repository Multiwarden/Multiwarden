# Multiwarden feature spec

Multiwarden is built in separate forks (the browser extension in
[multiwarden/clients](https://github.com/multiwarden/clients), the Android app in
[multiwarden/android](https://github.com/multiwarden/android), and later the desktop app and iOS).
They share no code, so a feature behaves the same everywhere only if every platform builds it
against the same description. This folder is that description.

| File                                       | Contents                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| [parity.md](parity.md)                     | Which feature is done, in progress or planned on which platform.               |
| [features/](features/)                     | One page per feature: what the user sees and the rules every platform follows. |
| [process.md](process.md)                   | How a feature moves from idea to release: issues, the board and release notes. |
| [platform-templates/](platform-templates/) | Files to copy into each platform repository (issue form, PR template lines).   |
| [scripts/](scripts/)                       | `feature-notes.sh`, which adds spec links to a platform's release notes.       |

## Features

| ID                                                             | Feature                                        |
| -------------------------------------------------------------- | ---------------------------------------------- |
| [`multi-account-autofill`](features/multi-account-autofill.md) | Autofill from every unlocked account           |
| [`page-load-account`](features/page-load-account.md)           | Choosing the account for autofill on page load |
| [`save-account-picker`](features/save-account-picker.md)       | Choosing the account when saving a login       |
| [`multi-account-passkeys`](features/multi-account-passkeys.md) | Passkeys from every unlocked account           |
| [`multi-account-totp`](features/multi-account-totp.md)         | TOTP codes from the item's own account         |
| [`account-labels`](features/account-labels.md)                 | Every screen says which account it uses        |
| [`combined-vault`](features/combined-vault.md)                 | One vault list for every unlocked account      |
| [`multiwarden-settings`](features/multiwarden-settings.md)     | Multiwarden's own settings page                |
| [`hide-premium-notices`](features/hide-premium-notices.md)     | Option to hide Premium upgrade notices         |
| [`side-by-side-install`](features/side-by-side-install.md)     | Installs next to the official Bitwarden app    |

The ID is the file name. It never changes once a feature has shipped somewhere, because issues,
pull requests and release notes refer to it.

## Writing a feature page

Copy [features/\_template.md](features/_template.md). Describe behaviour from the user's side and
as rules ("an update goes to the login's own account"), not as code: the code differs per
platform. Platform-specific details go under **Platform notes**. When a platform finds a rule
that can't work there, change the page in the same pull request that adds the platform note, so
the page stays the single description.
