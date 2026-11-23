<p align="center"><img src="logo/logo512.png" width="112" alt="Multiwarden"></p>

<h1 align="center">Multiwarden</h1>

<p align="center">
  All your vaults, working as one.
</p>

<p align="center">
  <a href="https://multiwarden.com">Website</a> ·
  <a href="https://github.com/multiwarden/clients/releases">Releases</a> ·
  <a href="https://github.com/multiwarden/clients">Browser extension</a>
</p>

---

Multiwarden is an unofficial fork of the Bitwarden apps in which every unlocked account takes
part in autofill, saving and passkeys, instead of only the active one.

This repository holds the project's website and brand material. The apps live in their own
repositories.

## Repositories

| Repository                                                            | Contents                                 |
| --------------------------------------------------------------------- | ---------------------------------------- |
| [multiwarden/clients](https://github.com/multiwarden/clients)         | The browser extension                    |
| [multiwarden/android](https://github.com/multiwarden/android)         | The Android app                          |
| [multiwarden/multiwarden](https://github.com/multiwarden/multiwarden) | The website, logos and store screenshots |

## In this repository

| Path                          | Contents                                                                                     |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `site/`                       | The website, an Astro + Tailwind CSS project. Lists every platform's releases from GitHub.   |
| `logo/`                       | The logo (512 px) and the 128 px store icon.                                                 |
| `screenshots/`                | Screenshots of the apps, for the website and README.                                         |
| `store/screenshots/`          | Screenshots for the browser stores and Google Play.                                          |
| `.github/workflows/pages.yml` | Builds `site/` and deploys it to GitHub Pages; also rebuilds when releases change.           |
| `spec/`                       | The feature spec every platform builds from, and the [feature parity table](spec/parity.md). |

The extension's own icons are built from `multiwarden/branding/` in
[multiwarden/clients](https://github.com/multiwarden/clients); the files in `logo/` are copies for
the website and store listings. When the logo changes there, copy `logo512.png` and
`store-icon128.png` here too.

## Website

The site is a static [Astro](https://astro.build) project in `site/`, styled with Tailwind CSS.
It has a homepage, a download page per platform, a combined release timeline and the privacy
policy.

```sh
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # writes site/dist
```

Releases are fetched from the GitHub API when the site is built, so visitors never call the API
themselves. Set `GITHUB_TOKEN` when building locally to avoid GitHub's anonymous rate limit. The
Pages workflow rebuilds the site on every change, and checks every hour whether any release was
added or changed. An app repository can also update the site straight away by sending a
`repository_dispatch` event of type `release` to this repository.

Platforms, their repositories, download files and store links are configured in
`site/src/data/platforms.ts`. When a platform publishes its first GitHub release, it switches
from "coming soon" to available everywhere on the site. Add store links to its `stores` list once
a listing is live.

`site/CNAME` holds the custom domain; it is copied into the build together with
`logo/logo512.png`. Publishing needs GitHub Pages set to **GitHub Actions** (Settings → Pages →
Source) and the same domain entered there.

## License and trademarks

Multiwarden is licensed under the GNU GPL v3, like the Bitwarden code it is based on. The GPL
covers the code; under its section 7(e) it does not grant rights to use the Multiwarden name or
logo to identify other or modified versions.

Contributions, security reports and support questions follow the organization's
[contributing guide](https://github.com/multiwarden/.github/blob/main/CONTRIBUTING.md),
[security policy](https://github.com/multiwarden/.github/blob/main/SECURITY.md) and
[code of conduct](https://github.com/multiwarden/.github/blob/main/CODE_OF_CONDUCT.md).

Multiwarden is **not affiliated with, endorsed by, or supported by Bitwarden, Inc.** "Bitwarden"
is a registered trademark of Bitwarden Inc., used here only to describe compatibility.
