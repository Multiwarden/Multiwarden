// Every platform Multiwarden ships on, and where its releases come from.
//
// To add a platform: add an entry here. Once its repository publishes a GitHub release whose
// tag matches `tagPattern`, it shows up as available on every page; until then `status`
// decides how it is shown ("planned" or "soon").
//
// Store links: fill in `stores` once a listing is live. They are shown above the direct
// downloads.

export type PlatformId = "browser" | "android" | "desktop" | "ios";

export interface Variant {
  /** Stable key, used for browser detection and anchors. */
  id: string;
  label: string;
  /** Matches the release asset that belongs to this variant. */
  asset: RegExp;
  /** Short hint shown next to the download. */
  note?: string;
}

export interface Store {
  label: string;
  url: string;
}

export interface Platform {
  /** Shown while no release exists, e.g. what it is waiting on. */
  roadmap?: string;
  id: PlatformId;
  name: string;
  /** One line under the name. */
  blurb: string;
  /** Shown while no release exists. */
  status: "soon" | "planned";
  /** `owner/name` of the GitHub repository whose releases belong to this platform. */
  repo?: string;
  /** Which tags in `repo` are this platform's releases. */
  tagPattern?: RegExp;
  /**
   * When several platforms share a repository, a release only counts for this platform if it
   * has an asset matching this pattern.
   */
  releaseAsset?: RegExp;
  variants: Variant[];
  stores: Store[];
  /** Install steps for direct downloads, as HTML. */
  install?: string[];
}

export const platforms: Platform[] = [
  {
    id: "browser",
    name: "Browser extension",
    blurb: "Chrome, Edge, Opera, Brave, Vivaldi, Firefox and Safari",
    status: "soon",
    repo: "multiwarden/clients",
    // Multiwarden's extension releases are tagged v<bitwarden version>.<release>, e.g.
    // v2026.11.0.2. Upstream tags (browser-v…, desktop-v…) don't match.
    tagPattern: /^v\d/,
    variants: [
      {
        id: "chrome",
        label: "Chrome",
        asset: /^multiwarden-chrome-.*\.zip$/,
        note: "Also Brave and Vivaldi",
      },
      { id: "edge", label: "Edge", asset: /^multiwarden-edge-.*\.zip$/ },
      { id: "opera", label: "Opera", asset: /^multiwarden-opera-.*\.zip$/ },
      { id: "firefox", label: "Firefox", asset: /^multiwarden-firefox-.*\.zip$/ },
      {
        id: "safari",
        label: "Safari",
        asset: /^multiwarden-safari-.*\.zip$/,
        note: "Unsigned test build for macOS",
      },
    ],
    stores: [
      {
        label: "Chrome Web Store",
        url: "https://chromewebstore.google.com/detail/multiwarden-multi-account/cdigmfigoadangkckfadcmhabplleakc",
      },
    ],
    install: [
      "Download the package for your browser and unzip it.",
      "Chromium browsers: open the extensions page, turn on <em>Developer mode</em> and choose <em>Load unpacked</em>. Firefox: open <code>about:debugging</code> and choose <em>Load Temporary Add-on</em> (Firefox removes it again when it restarts).",
      "Turn off the official Bitwarden extension, then sign in to and unlock your accounts.",
    ],
  },
  {
    id: "android",
    name: "Android",
    blurb: "Phones and tablets",
    status: "soon",
    repo: "multiwarden/android",
    tagPattern: /^v\d/,
    variants: [{ id: "apk", label: "APK", asset: /\.apk$/i }],
    stores: [],
    install: [
      "Download the APK on your phone and open it.",
      "Allow installing from your browser when Android asks.",
    ],
  },
  {
    id: "desktop",
    name: "Desktop",
    blurb: "Windows, macOS and Linux",
    status: "soon",
    // The desktop app is released together with the extension, from the same repository.
    repo: "multiwarden/clients",
    tagPattern: /^v\d/,
    releaseAsset: /^Multiwarden-.*\.(exe|dmg|zip|AppImage|deb)$/,
    variants: [
      {
        id: "windows",
        label: "Windows",
        asset: /^Multiwarden-.*-Setup\.exe$/,
        note: "Installer",
      },
      {
        id: "windows-portable",
        label: "Windows portable",
        asset: /^Multiwarden-.*-Portable\.exe$/,
        note: "No installation",
      },
      {
        id: "macos",
        label: "macOS",
        asset: /^Multiwarden-.*-mac-universal\.dmg$/,
        note: "Apple silicon and Intel",
      },
      {
        id: "linux-appimage",
        label: "Linux AppImage",
        asset: /^Multiwarden-.*\.AppImage$/,
      },
      {
        id: "linux-deb",
        label: "Linux .deb",
        asset: /^Multiwarden-.*\.deb$/,
        note: "Debian and Ubuntu",
      },
    ],
    stores: [],
    install: [
      "Download the installer for your system and run it. Bitwarden's desktop app can stay installed: Multiwarden keeps its own data.",
      "Windows: the installer is not signed yet, so SmartScreen asks first; choose <em>More info</em> and <em>Run anyway</em>. macOS: the app is not notarized yet, so right-click it and choose <em>Open</em> the first time.",
      "Sign in to and unlock your accounts. New versions are on this page; the app does not update itself.",
    ],
  },
  {
    id: "ios",
    name: "iOS",
    blurb: "iPhone and iPad",
    status: "planned",
    roadmap: "Planned next.",
    variants: [],
    stores: [],
  },
];

export const github = {
  org: "https://github.com/multiwarden",
  site: "https://github.com/multiwarden/multiwarden",
  issues: "https://github.com/multiwarden/clients/issues",
};
