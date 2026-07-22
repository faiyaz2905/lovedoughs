import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { Btn } from "@/components/Button";
import { BrowserCookieGuide } from "@/components/tradecookies/BrowserCookieGuide";
import { ResultsDialog } from "@/components/tradecookies/ResultsDialog";
import { absoluteUrl, canonicalLink } from "@/lib/site";
import { formatDuration, sitesToChips } from "@/lib/tradecookies/config";
import { parseOcrText, runScreenshotOcr, type OcrParseResult } from "@/lib/tradecookies/ocr";
import {
  awardChips,
  loadProfile,
  msUntilStackAllowed,
  type TradeProfile,
} from "@/lib/tradecookies/storage";
import { Sparkle } from "@/components/Doodles";

export const Route = createFileRoute("/tradecookies")({
  head: () => ({
    meta: [
      { title: "Trade Cookies for Chips | Love Doughs" },
      {
        name: "description",
        content:
          "Trade website cookies for real cookies. Check your last 24 hours, earn chips (৳1 each), and redeem toward Love Doughs tins.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Trade Cookies for Chips | Love Doughs" },
      {
        property: "og:description",
        content: "Trade website cookies for real cookies — Love Doughs chips.",
      },
      { property: "og:url", content: absoluteUrl("/tradecookies") },
    ],
    links: [canonicalLink("/tradecookies")],
  }),
  component: TradeCookiesPage,
});

const inputCx =
  "w-full rounded-[10px] border-2 border-border-subtle bg-white px-4 py-3 font-body text-base text-chocolate placeholder:text-caramel/60 focus:border-chocolate focus:outline-none focus:ring-2 focus:ring-caramel/30 transition";

function TradeCookiesPage() {
  const [profile, setProfile] = useState<TradeProfile>(() =>
    typeof window !== "undefined"
      ? loadProfile()
      : { chips: 0, submissions: [], coupons: [] },
  );
  const [file, setFile] = useState<File | null>(null);
  const [ocr, setOcr] = useState<OcrParseResult | null>(null);
  const [siteCount, setSiteCount] = useState("");
  const [confirm24h, setConfirm24h] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastAward, setLastAward] = useState<{
    siteCount: number;
    chipsAwarded: number;
  } | null>(null);
  const [stackWaitMs, setStackWaitMs] = useState(0);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setStackWaitMs(msUntilStackAllowed(p));
  }, []);

  useEffect(() => {
    if (stackWaitMs <= 0) return;
    const t = setInterval(() => {
      setStackWaitMs(msUntilStackAllowed(loadProfile()));
    }, 30_000);
    return () => clearInterval(t);
  }, [stackWaitMs]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOcr(null);

    if (!file) {
      setError("Upload a screenshot of your last-24-hour site count.");
      return;
    }

    const wait = msUntilStackAllowed(profile);
    if (wait > 0) {
      setError(`Next trade unlocks in ${formatDuration(wait)}.`);
      setStackWaitMs(wait);
      return;
    }

    setBusy(true);
    try {
      const result = await runScreenshotOcr(file);
      setOcr(result);

      if (result.rejected) {
        setError(result.reason || "We only accept last-24-hour counts.");
        return;
      }

      if (result.suggestedCount != null) {
        setSiteCount(String(result.suggestedCount));
      }

      if (result.window === "unknown") {
        setConfirm24h(false);
      } else if (result.window === "24h") {
        setConfirm24h(true);
      }
    } catch {
      setError(
        "Couldn’t read that image. Try a clearer screenshot, or enter the count manually below after retrying.",
      );
      setOcr(parseOcrText(""));
      setConfirm24h(false);
    } finally {
      setBusy(false);
    }
  }

  function onConfirmAward(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const count = parseInt(siteCount, 10);
    if (!Number.isFinite(count) || count < 1) {
      setError("Enter a valid site count from the last 24 hours.");
      return;
    }

    if (ocr?.window === "unknown" && !confirm24h) {
      setError("Confirm this is your last-24-hours count.");
      return;
    }

    if (ocr?.rejected) {
      setError(ocr.reason || "We only accept last-24-hour counts.");
      return;
    }

    const result = awardChips(profile, count);

    if (!result.ok) {
      setError(result.reason);
      if (result.waitMs) setStackWaitMs(result.waitMs);
      return;
    }

    setProfile(result.profile);
    setLastAward({ siteCount: count, chipsAwarded: result.chipsAwarded });
    setStackWaitMs(msUntilStackAllowed(result.profile));
    setDialogOpen(true);
    setFile(null);
    setOcr(null);
    setSiteCount("");
    setConfirm24h(false);
  }

  const previewChips = siteCount ? sitesToChips(parseInt(siteCount, 10) || 0) : 0;
  const showConfirm = ocr !== null && !ocr.rejected;

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-28 text-center lg:px-12">
        <SectionLabel>Trade cookies</SectionLabel>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-chocolate md:text-6xl">
          Trade website cookies for <span className="italic">real cookies</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-chocolate/80">
          The site you came from made you accept cookies — but you didn&apos;t get any. How many
          sites gave you that false promise? Check your last 24 hours, trade the count for chips,
          and put them toward real Love Doughs cookie dough. 1 chip = ৳1.
        </p>
        {profile.chips > 0 && (
          <p className="mt-4 font-body text-sm text-caramel">
            Your balance:{" "}
            <span className="font-semibold text-chocolate">{profile.chips} chips</span>
            {stackWaitMs > 0 && <> · next trade in {formatDuration(stackWaitMs)}</>}
          </p>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-3 lg:px-12">
        {[
          { t: "1. Find", b: "Open cookie / site data for the last 24 hours." },
          { t: "2. Upload", b: "Screenshot that count. We OCR it on your device." },
          { t: "3. Trade", b: "Earn chips, stack after 25h, or redeem a coupon." },
        ].map((s) => (
          <div
            key={s.t}
            className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(71,26,20,0.08)]"
          >
            <h2 className="font-display text-xl text-chocolate">{s.t}</h2>
            <p className="mt-2 font-body text-sm text-chocolate/75">{s.b}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-10 lg:px-12">
        <BrowserCookieGuide />
      </section>

      <section className="relative mx-auto max-w-3xl px-6 pb-24 lg:px-12">
        <Sparkle className="absolute -right-2 top-0 h-8 w-8 text-gold md:right-8" />
        <form
          onSubmit={showConfirm ? onConfirmAward : onSubmit}
          className="space-y-5 rounded-2xl border border-border-subtle bg-white p-6 shadow-[0_8px_24px_rgba(71,26,20,0.08)] md:p-8"
        >
          <div>
            <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              Screenshot (last 24 hours)
            </label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                setOcr(null);
                setError("");
              }}
              className="block w-full font-body text-sm text-chocolate file:mr-4 file:rounded-[10px] file:border-0 file:bg-blush file:px-4 file:py-2 file:font-semibold file:text-chocolate"
              disabled={busy || showConfirm}
            />
            {file && (
              <p className="mt-2 font-body text-xs text-chocolate/60">{file.name}</p>
            )}
          </div>

          {showConfirm && (
            <div className="space-y-4 rounded-xl bg-cream p-4">
              <p className="font-body text-sm text-chocolate/80">
                We read your screenshot locally. Confirm the site count
                {ocr.window === "24h"
                  ? " (detected last 24 hours)."
                  : " and that it’s the last 24 hours."}
              </p>
              <div>
                <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
                  Sites in last 24 hours
                </label>
                <input
                  type="number"
                  min={1}
                  max={20000}
                  value={siteCount}
                  onChange={(e) => setSiteCount(e.target.value)}
                  className={inputCx}
                  required
                />
                {previewChips > 0 && (
                  <p className="mt-2 font-body text-sm text-caramel">
                    ≈ {previewChips} chips (৳{previewChips})
                  </p>
                )}
              </div>
              {ocr.window === "unknown" && (
                <label className="flex items-start gap-3 font-body text-sm text-chocolate">
                  <input
                    type="checkbox"
                    checked={confirm24h}
                    onChange={(e) => setConfirm24h(e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    This number is from my <strong>last 24 hours</strong> only.
                  </span>
                </label>
              )}
            </div>
          )}

          {error && (
            <p className="rounded-xl bg-velvet/10 px-4 py-3 font-body text-sm text-velvet">
              {error}
            </p>
          )}

          <Btn type="submit" className="w-full" disabled={busy}>
            {busy
              ? "Reading screenshot…"
              : showConfirm
                ? "Trade for chips"
                : "Upload & scan"}
          </Btn>

          <p className="font-body text-xs leading-relaxed text-chocolate/55">
            Screenshots stay on your device — nothing is uploaded to Love Doughs servers in this
            MVP. Stacking: one trade every 25 hours. Redeeming a coupon pauses trades for 7 days.
            We collect your email only when you redeem.
          </p>
        </form>
      </section>

      <ResultsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        profile={profile}
        onProfileChange={setProfile}
        lastAward={lastAward}
        stackWaitMs={stackWaitMs}
      />
    </PageShell>
  );
}
