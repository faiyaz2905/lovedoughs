export type BrowserKind =
  | "chrome-desktop"
  | "edge-desktop"
  | "firefox-desktop"
  | "safari-desktop"
  | "chrome-android"
  | "safari-ios"
  | "chrome-ios"
  | "generic";

export type BrowserGuide = {
  id: BrowserKind;
  label: string;
  steps: string[];
};

function detectKind(ua: string): BrowserKind {
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isEdge = /Edg\//i.test(ua);
  const isFirefox = /Firefox|FxiOS/i.test(ua);
  const isChrome = /Chrome|CriOS/i.test(ua) && !isEdge;
  const isSafari = /Safari/i.test(ua) && !isChrome && !isEdge && !isFirefox;

  if (isIOS) {
    if (isChrome) return "chrome-ios";
    return "safari-ios";
  }
  if (isAndroid && isChrome) return "chrome-android";
  if (isEdge) return "edge-desktop";
  if (isFirefox) return "firefox-desktop";
  if (isChrome) return "chrome-desktop";
  if (isSafari) return "safari-desktop";
  return "generic";
}

const GUIDES: Record<BrowserKind, BrowserGuide> = {
  "chrome-desktop": {
    id: "chrome-desktop",
    label: "Chrome (desktop)",
    steps: [
      "Open Chrome Settings (⋮ menu → Settings).",
      "Go to Privacy and security → Cookies and other site data → See all site data and permissions (or “See all cookies and site data”).",
      "Set the time filter to Last 24 hours / Past day if available.",
      "Note the number of sites (or cookies) shown for that window.",
      "Screenshot that screen — we only accept last 24 hours.",
    ],
  },
  "edge-desktop": {
    id: "edge-desktop",
    label: "Edge (desktop)",
    steps: [
      "Open Edge Settings (⋯ → Settings).",
      "Go to Cookies and site permissions → Manage and delete cookies and site data → See all cookies and site data.",
      "Filter or sort to the last 24 hours / past day if your Edge build shows a time range.",
      "Note the site count for the past day.",
      "Screenshot that view — last 24 hours only.",
    ],
  },
  "firefox-desktop": {
    id: "firefox-desktop",
    label: "Firefox (desktop)",
    steps: [
      "Open Firefox Settings (☰ → Settings).",
      "Privacy & Security → Cookies and Site Data → Manage Data…",
      "Review sites listed; if a time filter exists, choose last 24 hours / past day.",
      "Count or note sites active in the past day (or use any on-screen total).",
      "Screenshot the dialog — we only trade last-24h counts.",
    ],
  },
  "safari-desktop": {
    id: "safari-desktop",
    label: "Safari (Mac)",
    steps: [
      "Safari → Settings (or Preferences) → Privacy.",
      "Click Manage Website Data…",
      "Review stored sites; estimate or note activity from the past day.",
      "If your macOS shows a time range, pick Last 24 hours / Past day.",
      "Screenshot that list — last 24 hours only.",
    ],
  },
  "chrome-android": {
    id: "chrome-android",
    label: "Chrome (Android)",
    steps: [
      "Chrome → ⋮ → Settings → Site settings → Cookies (or Privacy → Delete browsing data for a related view).",
      "Open “All sites” / site data if available.",
      "Look for last 24 hours / past day activity or totals.",
      "Screenshot the count for the past day.",
      "We reject hour / week windows — last 24 hours only.",
    ],
  },
  "safari-ios": {
    id: "safari-ios",
    label: "Safari (iPhone / iPad)",
    steps: [
      "Open the iOS Settings app (not Safari’s page menu).",
      "Safari → Advanced → Website Data.",
      "Review websites with stored data; focus on recent / past-day activity.",
      "Screenshot that list with a clear site count if shown.",
      "We only accept a last-24-hours count.",
    ],
  },
  "chrome-ios": {
    id: "chrome-ios",
    label: "Chrome (iPhone / iPad)",
    steps: [
      "Chrome → ⋮ → Settings → Content Settings / Privacy.",
      "Open Cookies or Site settings → view site data if available.",
      "Find last 24 hours / past day totals when shown.",
      "Screenshot that screen.",
      "Last 24 hours only — other windows will be rejected.",
    ],
  },
  generic: {
    id: "generic",
    label: "Your browser",
    steps: [
      "Open your browser’s Settings → Privacy / Cookies / Site data.",
      "Find “Cookies and other site data” or “Website Data”.",
      "Set any time filter to Last 24 hours or Past day.",
      "Note the number of sites for that window.",
      "Screenshot it — we only trade last-24-hour counts.",
    ],
  },
};

export function getBrowserGuide(
  ua = typeof navigator !== "undefined" ? navigator.userAgent : "",
): BrowserGuide {
  return GUIDES[detectKind(ua)];
}

export const ALL_GUIDES = Object.values(GUIDES).filter((g) => g.id !== "generic");
