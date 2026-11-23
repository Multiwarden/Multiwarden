// Loads every platform's releases from the GitHub API at build time.
//
// The site is rebuilt when releases change (see .github/workflows/pages.yml), so visitors never
// call the GitHub API themselves. Set GITHUB_TOKEN to avoid the anonymous rate limit.

import { Marked, Renderer } from "marked";
import { platforms, type Platform, type PlatformId } from "../data/platforms";

export interface Download {
  variantId: string;
  label: string;
  note?: string;
  url: string;
  size: number;
}

export interface Release {
  platform: PlatformId;
  platformName: string;
  repo: string;
  tag: string;
  version: string;
  title: string;
  date: string;
  prerelease: boolean;
  url: string;
  notesHtml: string;
  downloads: Download[];
  /** Other assets, such as the source package. */
  extras: { name: string; url: string; size: number }[];
}

interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  html_url: string;
  published_at: string | null;
  created_at: string;
  assets: GitHubAsset[];
}

// Release notes are rendered as Markdown with raw HTML shown as text, not interpreted.
const renderer = new Renderer();
renderer.html = ({ text }) => escapeHtml(text);
const markdown = new Marked({ renderer, gfm: true, breaks: false });

/** Release notes as HTML, without the HTML comments GitHub's generated notes start with. */
function notes(body: string | null): string {
  const text = (body ?? "").replace(/<!--[\s\S]*?-->/g, "").trim();
  return text ? (markdown.parse(text) as string) : "";
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

async function fetchReleases(repo: string): Promise<GitHubRelease[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "multiwarden-site",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${repo} releases`);
  return (await res.json()) as GitHubRelease[];
}

function toRelease(platform: Platform, r: GitHubRelease): Release {
  const used = new Set<string>();
  const downloads: Download[] = [];
  for (const v of platform.variants) {
    const asset = r.assets.find((a) => v.asset.test(a.name));
    if (!asset) continue;
    used.add(asset.name);
    downloads.push({
      variantId: v.id,
      label: v.label,
      note: v.note,
      url: asset.browser_download_url,
      size: asset.size,
    });
  }
  const extras = r.assets
    .filter((a) => !used.has(a.name))
    .map((a) => ({ name: a.name, url: a.browser_download_url, size: a.size }));

  return {
    platform: platform.id,
    platformName: platform.name,
    repo: platform.repo!,
    tag: r.tag_name,
    version: r.tag_name.replace(/^v/, ""),
    title: r.name || r.tag_name,
    date: r.published_at ?? r.created_at,
    prerelease: r.prerelease,
    url: r.html_url,
    notesHtml: notes(r.body),
    downloads,
    extras,
  };
}

let cache: Promise<Release[]> | undefined;

/** Every published release on every platform, newest first. */
export function getReleases(): Promise<Release[]> {
  cache ??= (async () => {
    const all: Release[] = [];
    for (const platform of platforms) {
      if (!platform.repo) continue;
      let list: GitHubRelease[];
      try {
        list = await fetchReleases(platform.repo);
      } catch (error) {
        // In CI a failed fetch must not publish a site without releases.
        if (process.env.CI) throw error;
        console.warn(`[releases] ${(error as Error).message}; building without them.`);
        continue;
      }
      for (const r of list) {
        if (r.draft) continue;
        if (platform.tagPattern && !platform.tagPattern.test(r.tag_name)) continue;
        all.push(toRelease(platform, r));
      }
    }
    return all.sort((a, b) => b.date.localeCompare(a.date));
  })();
  return cache;
}

/** The newest stable release of a platform, or its newest pre-release if it has no stable one. */
export function latestFor(releases: Release[], id: PlatformId): Release | undefined {
  const own = releases.filter((r) => r.platform === id);
  return own.find((r) => !r.prerelease) ?? own[0];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
