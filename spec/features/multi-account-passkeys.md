# Passkeys from every unlocked account

**ID:** `multi-account-passkeys` · **Status:** see [parity](../parity.md)

## What the user gets

Signing in with a passkey offers the passkeys of every unlocked account, and creating a passkey
asks which account to save it to.

## Rules

1. Sign-in offers matching passkeys from every unlocked account, each with its
   [label](account-labels.md).
2. Using a passkey signs with, and updates the counter in, the owning account.
3. Creating a passkey shows a "Save to account" picker, with the same pre-selection rules as
   [`save-account-picker`](save-account-picker.md).
4. Passkey prompts work while any account is unlocked.

## Platform notes

### Browser extension

Hooks in `fido2-authenticator.service.ts`, `fido2-client.service.ts`,
`browser-fido2-user-interface.service.ts` and the passkey popup (`fido2.component`,
`fido2-cipher-row.component`).

### Android

Through Android's Credential Manager provider. Planned after
[`multi-account-autofill`](multi-account-autofill.md).

### Desktop

The desktop app's passkey provider, where the OS supports it.

### iOS

The AutoFill extension's passkey support.
