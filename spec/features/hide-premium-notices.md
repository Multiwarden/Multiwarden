# Hide Premium notices

**ID:** `hide-premium-notices` · **Status:** see [parity](../parity.md)

## What the user gets

An option to hide Bitwarden's Premium upgrade badges, banners and spotlights.

## Rules

1. Off by default.
2. Hides upgrade prompts only. Premium features themselves, and messages about what an account
   can or can't do, stay.

## Platform notes

### Browser extension

Hides `app-premium-badge`, `billing-premium-upgrade-nudge` and anything marked
`data-multiwarden-premium` (`popup/multiwarden-popup-settings.ts`).

### Desktop

Same CSS as the extension, shared in `libs/angular/src/multiwarden/multiwarden-premium-notices.ts`.
