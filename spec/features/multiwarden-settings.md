# Multiwarden settings

**ID:** `multiwarden-settings` · **Status:** see [parity](../parity.md)

## What the user gets

A **Multiwarden** page in Settings with the options only Multiwarden has, and what version is
running.

## Rules

1. Settings are the same for every account (device-wide), not per account.
2. The page lists, where the platform has the feature:
   - Remember the save account per site (on) — [`save-account-picker`](save-account-picker.md)
   - Autofill on page load account (Remembered) — [`page-load-account`](page-load-account.md)
   - Hide Premium notices (off) — [`hide-premium-notices`](hide-premium-notices.md)
3. An About section shows the Multiwarden version, the Bitwarden version it is based on, and
   links to release notes, the source and "Report an issue".
4. Defaults are the same on every platform.

## Platform notes

### Browser extension

`apps/browser/src/multiwarden/multiwarden-settings.ts` and `popup/multiwarden-settings.component.*`.
