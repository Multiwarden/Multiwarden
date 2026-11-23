# Autofill from every unlocked account

**ID:** `multi-account-autofill` · **Status:** see [parity](../parity.md)

## What the user gets

Bitwarden keeps several accounts unlocked at once but only fills from the active one. In
Multiwarden every unlocked account takes part in autofill, so the user doesn't have to switch
accounts to fill a login.

## Rules

1. Suggestions come from the active account first, then from every other unlocked account.
   Locked accounts never take part.
2. Autofill works while any account is unlocked, not only while the active one is.
3. While more than one account is unlocked, every suggestion shows which account it belongs to
   (see [`account-labels`](account-labels.md)).
4. Filling, copying and "last used" bookkeeping use the account that owns the item, never the
   active account.
5. Logins, cards and identities all follow these rules.
6. Policies (for example an organization's card-item restriction) are applied per account: each
   account's own policies decide which of its items are offered.
7. Organization events are only recorded where the platform can do so for the owning account; if
   it can't, they are recorded for the active account's items only, never for the wrong account.
8. Vault data is decrypted with the owning account's keys, on the device. Nothing is sent to a
   server and no keys move between accounts.

## Out of scope

- Unlocking locked accounts to fill from them.
- Choosing the account for automatic fill on page load (see [`page-load-account`](page-load-account.md)).

## Platform notes

### Browser extension

Inline menu, right-click context menu, keyboard shortcut and toolbar badge all use every unlocked
account. Core: `libs/common/src/multiwarden/multi-account-scope.ts`; hooks in
`overlay.background.ts`, `autofill.service.ts`, `autofill-orchestrator.ts`,
`autofill-badge-updater.service.ts` and the context-menu handlers. Known limit: the toolbar badge
refreshes on tab change, so a change in another account's vault shows on the next tab change.
Rule 6 (per-account card policies) still needs checking against the extension.

### Android

Android Autofill framework suggestions. `MultiAccountVault` reads another account's vault from
the local database and decrypts it with that account's own SDK client
(`app/src/main/kotlin/com/x8bit/bitwarden/multiwarden/`). The account's email is shown after the
suggestion's subtitle.

### Desktop

Applies to the desktop app's autotype (Windows) where available.

### iOS

AutoFill credential provider extension.
