// Guesses the visitor's platform in the browser, to suggest the right download.

import type { PlatformId } from "../data/platforms";

export interface Detected {
  platform: PlatformId;
  /** The variant within the platform, e.g. "firefox". */
  variant?: string;
  label: string;
}

export function detectBrowser(): Detected | undefined {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return { platform: "android", label: "Android" };
  if (/iPhone|iPad|iPod/i.test(ua)) return { platform: "ios", label: "iOS" };

  if (/Firefox\//.test(ua)) return { platform: "browser", variant: "firefox", label: "Firefox" };
  if (/Edg\//.test(ua)) return { platform: "browser", variant: "edge", label: "Edge" };
  if (/OPR\//.test(ua)) return { platform: "browser", variant: "opera", label: "Opera" };
  if (/Vivaldi\//.test(ua)) return { platform: "browser", variant: "chrome", label: "Vivaldi" };
  if ("brave" in navigator) return { platform: "browser", variant: "chrome", label: "Brave" };
  if (/Chrome\/|Chromium\//.test(ua)) return { platform: "browser", variant: "chrome", label: "Chrome" };
  if (/Safari\//.test(ua)) return { platform: "browser", variant: "safari", label: "Safari" };
  return undefined;
}
