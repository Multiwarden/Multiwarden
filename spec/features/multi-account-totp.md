# TOTP from the item's own account

**ID:** `multi-account-totp` · **Status:** see [parity](../parity.md)

## What the user gets

Copying or auto-copying a verification code works for items from any unlocked account.

## Rules

1. The code is generated from the owning account's item.
2. Whether TOTP is available (Premium or organization access) is decided by the owning account,
   not the active one.
3. Auto-copy after fill follows the owning account's setting where the setting is per account.

## Platform notes

### Browser extension

`autofill.service.ts` uses the owning account for the premium check.

### Android

`AutofillTotpManagerImpl` uses the owning account's premium status and code.
