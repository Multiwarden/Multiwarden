# How a feature moves across platforms

Each Multiwarden feature has one description (its [spec page](features/)), one **feature issue**
in this repository, and one **platform sub-issue** in each platform repository that builds it.
The org's project board shows them all; release notes link back to the spec page.

```
spec/features/<id>.md                  what the feature does, for every platform
  └ multiwarden/multiwarden#N           feature issue ("Feature: <id>"), label "feature"
      ├ multiwarden/clients#…            sub-issue: browser extension (later also desktop)
      ├ multiwarden/android#…            sub-issue: Android
      └ (iOS repository)#…               sub-issue: iOS
```

## 1. A new feature

1. Write `spec/features/<id>.md` from the [template](features/_template.md) and add a row to
   [parity.md](parity.md) with 📋 for every platform where it applies. Open a pull request here.
2. Open a feature issue here with the **Feature** form. It links to the spec page and has one
   checkbox per platform.
3. For each platform that applies, open a sub-issue in that platform's repository with the
   **Platform work** form, and add it to the feature issue as a sub-issue (on the feature issue:
   **Create sub-issue → Add existing issue**). Platforms that don't apply get ➖ in the table
   and no sub-issue.

An existing feature that gains a platform (for example the desktop app) only needs step 3 and a
change to its parity row.

## 2. Building it on a platform

- The pull request in the platform repository closes its sub-issue (`Closes #…`) and has a line
  `Feature: <id>` in its description (the [PR template lines](platform-templates/) add it). That
  line is what puts the feature into the release notes.
- If the platform can't follow a rule from the spec, change the spec page in a pull request here
  first or at the same time, and note the difference under **Platform notes**. The spec must
  describe what is shipped.
- Set the parity cell to 🚧 with a link to the pull request when work starts.

## 3. Released

- After a release that includes it, set the parity cell to ✅ with the first version, and close
  the sub-issue if the pull request didn't.
- The feature issue is closed when every applicable platform is ✅. Until then it stays open and
  its sub-issue progress bar shows how far along it is.

## The project board

An org-level GitHub Project, **Multiwarden parity**, holds every feature issue and every platform
sub-issue.

| Field    | Values                                            |
| -------- | ------------------------------------------------- |
| Status   | Planned · In progress · Released                  |
| Platform | Spec · Extension · Android · Desktop · iOS        |
| Feature  | The feature ID (text), so items group per feature |
| Version  | First release that shipped it (text)              |

Views:

- **Parity**: table grouped by Feature, columns Platform, Status, Version. This is
  [parity.md](parity.md) as live data.
- **Per platform**: board with Status columns, one tab per Platform filter (`platform:Android`
  and so on), for planning the next work on one app.
- **Roadmap**: board of feature issues only (`label:feature`) by Status.

Workflows (board settings → Workflows): auto-add new issues from `multiwarden/multiwarden`,
`multiwarden/clients` and `multiwarden/android` that have the `feature` or `platform` label;
item closed → Status "Released"; pull request merged → Status "Released".

[parity.md](parity.md) stays the summary for people who don't open the board. When the two
disagree, the board is right for "in progress" and the table is right for released versions.

## Release notes

Platform releases use GitHub's generated notes, which list pull request titles. To link those
releases to the spec:

1. Every feature pull request has `Feature: <id>` in its description (more than one line if it
   touches several features).
2. The release workflow appends a **Multiwarden features** section made by
   [`scripts/feature-notes.sh`](scripts/feature-notes.sh), which reads the merged pull requests
   since the previous tag and links each feature ID to its spec page:

   ```yaml
   - name: Link spec pages in the release notes
     env:
       GH_TOKEN: ${{ github.token }}
     run: |
       prev=$(gh release list --repo "$GITHUB_REPOSITORY" --limit 2 --json tagName --jq '.[1].tagName')
       curl -fsSL https://raw.githubusercontent.com/multiwarden/multiwarden/main/spec/scripts/feature-notes.sh -o feature-notes.sh
       bash feature-notes.sh "$GITHUB_REPOSITORY" "$prev" "$tag" > features.md
       if [ -s features.md ]; then
         gh release view "$tag" --repo "$GITHUB_REPOSITORY" --json body --jq .body > notes.md
         printf '\n%s\n' "$(cat features.md)" >> notes.md
         gh release edit "$tag" --repo "$GITHUB_REPOSITORY" --notes-file notes.md
       fi
   ```

   The checkout step needs `fetch-depth: 0` so both tags are in the history.

3. The website's release list can show the same section, since it reads release bodies from the
   GitHub API.

## Labels

Used in every repository, so the board can pick items up:

| Label      | On                                              |
| ---------- | ----------------------------------------------- |
| `feature`  | Feature issues (here) and feature pull requests |
| `platform` | Platform sub-issues (platform repositories)     |

## Desktop runtime

The desktop app runs on Electron, like Bitwarden's, so it keeps every desktop feature and
Bitwarden's updates merge in automatically. Moving it to **Tauri** (smaller, lighter) is planned
for later. Until then, desktop work keeps that move cheap: Multiwarden logic runs in the app's
web UI through Bitwarden's own services and adds no Electron IPC, and every Electron
main-process difference is listed in one file,
`apps/desktop/src/multiwarden/main/multiwarden-main.ts` in multiwarden/clients. A port has to
replace Bitwarden's Electron main process (windows, tray, menus, storage, IPC to the Rust
native module), so it is a project of its own, with its own issue, once the desktop column is
complete.
