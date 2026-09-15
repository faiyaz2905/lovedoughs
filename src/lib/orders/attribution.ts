export type OrderAttribution = {
  sourceChannel: string;
  firstLandingUrl: string;
  orderPageUrl: string;
  referrer: string;
  entryPoint: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

type FirstTouchAttribution = Omit<OrderAttribution, "orderPageUrl" | "entryPoint">;

const STORAGE_KEY = "love-doughs.order-attribution.v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function limit(value: string, maxLength: number) {
  return value.slice(0, maxLength);
}

function cleanUrl(value: string) {
  try {
    const url = new URL(value);
    const params = new URLSearchParams();

    for (const key of UTM_KEYS) {
      const param = url.searchParams.get(key);
      if (param) params.set(key, limit(param, 120));
    }

    const query = params.toString();
    return limit(`${url.origin}${url.pathname}${query ? `?${query}` : ""}`, 500);
  } catch {
    return "";
  }
}

function referrerOrigin() {
  if (typeof document === "undefined" || !document.referrer) return "";

  try {
    return limit(new URL(document.referrer).origin, 300);
  } catch {
    return "";
  }
}

function sourceFrom(utmSource: string, referrer: string) {
  if (utmSource) return utmSource.toLowerCase();
  if (!referrer) return "direct";

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
    if (host.includes("instagram")) return "instagram";
    if (host.includes("facebook")) return "facebook";
    if (host.includes("tiktok")) return "tiktok";
    if (host.includes("google")) return "google";
    return host;
  } catch {
    return "other";
  }
}

function readStoredAttribution(): FirstTouchAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "null") as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const value = parsed as Partial<FirstTouchAttribution>;
    if (typeof value.firstLandingUrl !== "string") return null;

    return {
      sourceChannel: typeof value.sourceChannel === "string" ? value.sourceChannel : "direct",
      firstLandingUrl: value.firstLandingUrl,
      referrer: typeof value.referrer === "string" ? value.referrer : "",
      utmSource: typeof value.utmSource === "string" ? value.utmSource : "",
      utmMedium: typeof value.utmMedium === "string" ? value.utmMedium : "",
      utmCampaign: typeof value.utmCampaign === "string" ? value.utmCampaign : "",
      utmContent: typeof value.utmContent === "string" ? value.utmContent : "",
      utmTerm: typeof value.utmTerm === "string" ? value.utmTerm : "",
    };
  } catch {
    return null;
  }
}

function storeAttribution(attribution: FirstTouchAttribution) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Tracking must never interrupt the order flow if storage is unavailable.
  }
}

/**
 * Retains the first marketing touch for the current browser session, while
 * recording the exact page on which the order is eventually submitted.
 */
export function captureOrderAttribution(entryPoint = "order_page"): OrderAttribution {
  if (typeof window === "undefined") {
    return {
      sourceChannel: "direct",
      firstLandingUrl: "",
      orderPageUrl: "",
      referrer: "",
      entryPoint,
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: "",
    };
  }

  const currentUrl = cleanUrl(window.location.href);
  const params = new URLSearchParams(window.location.search);
  const utmSource = limit(params.get("utm_source")?.trim() ?? "", 120);
  const utmMedium = limit(params.get("utm_medium")?.trim() ?? "", 120);
  const utmCampaign = limit(params.get("utm_campaign")?.trim() ?? "", 120);
  const utmContent = limit(params.get("utm_content")?.trim() ?? "", 120);
  const utmTerm = limit(params.get("utm_term")?.trim() ?? "", 120);
  const referrer = referrerOrigin();
  const stored = readStoredAttribution();
  const hasCampaignTag = Boolean(utmSource || utmMedium || utmCampaign || utmContent || utmTerm);

  const firstTouch: FirstTouchAttribution =
    !stored || hasCampaignTag
      ? {
          sourceChannel: sourceFrom(utmSource, referrer),
          firstLandingUrl: currentUrl,
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
        }
      : stored;

  storeAttribution(firstTouch);

  return {
    ...firstTouch,
    orderPageUrl: currentUrl,
    entryPoint: limit(entryPoint || "order_page", 100),
  };
}
