# Account for autofill on page load

**ID:** `page-load-account` · **Status:** see [parity](../parity.md)

## What the user gets

When automatic fill on page load is on and several accounts have a matching login, Multiwarden
fills from a predictable account instead of guessing.

## Rules

1. The user chooses one of three modes in [Multiwarden settings](multiwarden-settings.md):
   - **Remembered** (default): the account last used on that site; if there is none, as **Unique**.
   - **Unique**: fill only when exactly one login across all unlocked accounts matches.
   - **Active**: only the active account (Bitwarden's own behaviour).
2. When no mode yields exactly one login, nothing is filled automatically. Manual fill still
   offers every account.
3. "Last used on this site" is stored with hashed site keys, never the plain URL.

## Platform notes

### Browser extension

`apps/browser/src/autofill/multiwarden/page-load-account.ts`, setting `pageLoadAutofillAccount`.

### Android, desktop, iOS

Not applicable: these platforms have no fill-on-page-load.
