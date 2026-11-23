# Choosing the account when saving

**ID:** `save-account-picker` · **Status:** see [parity](../parity.md)

## What the user gets

When the app offers to save a new login, the user picks which unlocked account it goes into.

## Rules

1. The save prompt has an account picker listing every unlocked account, each with its
   [label](account-labels.md).
2. The picker pre-selects the account last used on that site when "Remember the save account per
   site" is on (default on, in [Multiwarden settings](multiwarden-settings.md)); otherwise the
   active account.
3. An **update** to an existing login always goes to that login's own account, without a picker.
4. The remembered account per site is stored with hashed site keys.
5. With only one account unlocked, the prompt looks exactly like Bitwarden's.

## Platform notes

### Browser extension

Save-password bar (`notification.background.ts`, `notification/bar.ts`, `button-row.ts`);
remembered accounts in `apps/browser/src/autofill/multiwarden/last-account.ts`.

### Android

The Autofill save request and, later, Credential Manager's save flow. Planned after
[`multi-account-autofill`](multi-account-autofill.md).

### Desktop

Not applicable: the desktop app has no save prompt.

### iOS

The save flow of the AutoFill extension, where iOS offers one.
