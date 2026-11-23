# Combined vault

**ID:** `combined-vault` · **Status:** see [parity](../parity.md)

## What the user gets

A "Combined" view that shows every unlocked account's vault as one list, so the user doesn't have
to switch accounts to find an item.

## Rules

1. The account menu offers **Combined**, each account, and "Manage accounts". Combined stays on
   until the user picks a single account.
2. In Combined: the vault list, search, filters (folders, organizations, collections) and Sends
   include every unlocked account, each item [labelled](account-labels.md).
3. Opening, filling, copying, editing or deleting an item acts on the item's own account. Where
   the platform's code assumes one active account, the item's account is made active quietly
   first (no sync, no navigation, no visible switch).
4. Creating a new item or Send asks which account it goes into.
5. Pages that work per account (generator, settings) show which account they use and let the
   user change it.

## Platform notes

### Browser extension

Shared core in `libs/angular/src/multiwarden/` (`MultiwardenCombinedService`); the extension's
`BrowserMultiwardenPlatform`, account menu and combined item in
`apps/browser/src/multiwarden/popup/`.

### Android

Planned after [`multi-account-autofill`](multi-account-autofill.md).

### Desktop

Same shared core; `DesktopMultiwardenPlatform` and the desktop hooks in
`apps/desktop/src/multiwarden/` ([clients#25](https://github.com/multiwarden/clients/pull/25)).
"Combined" is in the account switcher. Not yet: folder, organization and collection filters show
the active account's only (rule 2).
