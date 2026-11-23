# Every screen says which account it uses

**ID:** `account-labels` · **Status:** see [parity](../parity.md)

## What the user gets

Wherever more than one account could be involved, the user can see which one an item, page or
action belongs to.

## Rules

1. While more than one account is unlocked, every item shown outside its own account's vault
   (autofill suggestions, context menus, combined lists) carries an account label: the account's
   avatar (colour and initials) where there is room, otherwise its email.
2. Folders from several accounts are named "account · folder".
3. Pages that act on one account (generator, settings, item pages) show that account, for example
   as an account chip at the top.
4. With one account unlocked, labels are hidden and screens look like Bitwarden's.

## Platform notes

### Browser extension

Account badge and vault banner in `libs/angular/src/multiwarden/`; account chip on the generator
and Settings pages; avatar values in `libs/common/src/multiwarden/account-avatar.ts`.

### Android

Autofill suggestions show the account email after the subtitle
([android#1](https://github.com/multiwarden/android/pull/1)). In-app screens follow with
[`combined-vault`](combined-vault.md).
