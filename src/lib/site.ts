/** Canonical production host. Override with VITE_SITE_URL when a custom domain is ready. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://lovedoughs.vercel.app").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "Love Doughs";

export const DHAKA_AREAS = [
  "Gulshan",
  "Banani",
  "Dhanmondi",
  "Bashundhara",
  "Uttara",
  "Mirpur",
  "Mohakhali",
  "Lalmatia",
] as const;

/** Build an absolute URL from a path or asset href. */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

/** Canonical link descriptor for TanStack Router `head()`. */
export function canonicalLink(path: string) {
  return { rel: "canonical" as const, href: absoluteUrl(path) };
}

/** Default Open Graph / Twitter share image (served from /public). */
export const DEFAULT_OG_IMAGE = absoluteUrl("/og/default.jpg");

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(data),
  };
}
