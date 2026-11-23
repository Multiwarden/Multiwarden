<p align="center"><img src="logo/logo512.png" width="112" alt="Multiwarden"></p>

<h1 align="center">Multiwarden</h1>

<p align="center">
  Every unlocked Bitwarden account, working at once.
</p>

<p align="center">
  <a href="https://multiwarden.mteij.nl">Website</a> ·
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

| Path                          | Contents                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `site/`                       | The website at multiwarden.mteij.nl (mu.css, indigo theme). Lists releases live from the GitHub API. |
| `logo/`                       | The logo (512 px) and the 128 px store icon.                                                         |
| `store/screenshots/`          | Screenshots for the browser stores and Google Play.                                                  |
| `.github/workflows/pages.yml` | Deploys `site/` to GitHub Pages on every change to `main`.                                           |
| `spec/`                       | The feature spec every platform builds from, and the [feature parity table](spec/parity.md).         |
| `.github/ISSUE_TEMPLATE/`     | The **Feature** issue form ([process](spec/process.md)).                                             |

The extension's own icons are built from `multiwarden/branding/` in
[multiwarden/clients](https://github.com/multiwarden/clients); the files in `logo/` are copies for
the website and store listings. When the logo changes there, copy `logo512.png` and
`store-icon128.png` here too.

## Website

The site is a single static page, `site/index.html`. Open it in a browser to preview it; the
release list loads from the GitHub API either way.

Publishing needs GitHub Pages set to **GitHub Actions** (Settings → Pages → Source) and the
custom domain `multiwarden.mteij.nl` entered there. `site/CNAME` keeps the domain in the
deployed site.

## License and trademarks

Multiwarden is licensed under the GNU GPL v3, like the Bitwarden code it is based on.

Multiwarden is **not affiliated with, endorsed by, or supported by Bitwarden, Inc.** "Bitwarden"
is a registered trademark of Bitwarden Inc., used here only to describe compatibility.
