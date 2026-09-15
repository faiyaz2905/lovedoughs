import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";

import { Btn, ExtBtn } from "@/components/Button";
import { HappyCupDoodle, HappyStarDoodle } from "@/components/Doodles";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { submitOrder } from "@/lib/api/orders.functions";
import { captureOrderAttribution } from "@/lib/orders/attribution";
import { countWords, limitToWordCount, TIN_NOTE_WORD_LIMIT } from "@/lib/orders/tin-note";
import { instaLink, INSTAGRAM_HANDLE, products } from "@/lib/products";
import { absoluteUrl, canonicalLink, DEFAULT_OG_IMAGE, DHAKA_AREAS } from "@/lib/site";
import { getUnusedCoupons, loadProfile } from "@/lib/tradecookies/storage";
import { Check, Instagram } from "lucide-react";

const orderSearchSchema = z.object({
  product: z.enum(["chocolate-chip", "red-velvet"]).optional(),
  entry: z.string().trim().max(100).optional(),
});

export const Route = createFileRoute("/order")({
  validateSearch: orderSearchSchema,
  head: () => ({
    meta: [
      { title: "Order Cookie Dough Tins | Love Doughs Dhaka" },
      {
        name: "description",
        content: `Order edible cookie dough tins in Dhaka. Pick a flavour, fill the form, we confirm on Instagram @${INSTAGRAM_HANDLE} within an hour.`,
      },
      { property: "og:title", content: "Order Cookie Dough Tins | Love Doughs Dhaka" },
      {
        property: "og:description",
        content:
          "Scoopable cookie dough tins delivered across Dhaka — Gulshan, Banani, Dhanmondi, and more.",
      },
      { property: "og:url", content: absoluteUrl("/order") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [canonicalLink("/order")],
  }),
  component: OrderPage,
});

type SubmissionState = "idle" | "saving" | "saved" | "error";

function createRequestId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function OrderPage() {
  const search = Route.useSearch();
  const [slug, setSlug] = useState(search.product ?? products[0].slug);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [website, setWebsite] = useState("");
  const [savedCoupons, setSavedCoupons] = useState<
    { code: string; takaValue: number; label: string }[]
  >([]);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [messageCopied, setMessageCopied] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [requestId] = useState(createRequestId);
  const product = products.find((p) => p.slug === slug)!;
  const total = product.price * qty;
  const noteWordCount = countWords(note);

  useEffect(() => {
    if (search.product) setSlug(search.product);
  }, [search.product]);

  useEffect(() => {
    const unused = getUnusedCoupons(loadProfile());
    setSavedCoupons(unused);
    if (unused.length === 1) setCouponCode(unused[0].code);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionState === "saving" || submissionState === "saved") return;

    setSubmissionState("saving");
    setSubmissionError("");

    try {
      const result = await submitOrder({
        data: {
          requestId,
          productSlug: slug,
          quantity: qty,
          customerName: name,
          deliveryArea: area,
          note,
          couponCode,
          heardFrom,
          website,
          attribution: captureOrderAttribution(search.entry ?? "order_page"),
        },
      });
      const message = [
        "Hi Love Doughs! New order:",
        `• Order ID: ${result.orderId}`,
        `• Flavour: ${result.productName}`,
        `• Quantity: ${qty}`,
        `• Name: ${name.trim()}`,
        `• Delivery area (Dhaka): ${area.trim()}`,
        `• Note: ${note.trim() || "—"}`,
        couponCode.trim() ? `• Trade Cookies code: ${couponCode.trim()}` : null,
        `• Total: ৳${result.total}`,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        await navigator.clipboard.writeText(message);
        setMessageCopied(true);
      } catch {
        setMessageCopied(false);
      }

      setOrderId(result.orderId);
      setSubmissionState("saved");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(
        error instanceof Error ? error.message : "We could not save your order. Please try again.",
      );
    }
  }

  return (
    <PageShell>
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-28 lg:px-12">
        <HappyCupDoodle className="absolute left-[-2%] top-[35%] hidden h-20 w-20 text-chocolate/35 xl:block" />
        <HappyStarDoodle className="absolute bottom-[25%] right-[-2%] hidden h-20 w-20 text-gold/60 xl:block" />
        <div className="text-center">
          <SectionLabel>Order a tin</SectionLabel>
          <h1 className="mt-4 font-display text-5xl font-bold text-chocolate md:text-6xl">
            One short form. <span className="italic">One sweet tin.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-chocolate/75">
            We save your order first, then confirm it on Instagram. Delivery across Dhaka within 24
            hours of confirmation — including {DHAKA_AREAS.slice(0, 6).join(", ")}, and nearby
            areas.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(71,26,20,0.08)]"
          >
            <div>
              <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
                Flavour
              </label>
              <div className="grid grid-cols-2 gap-3">
                {products.map((p) => (
                  <button
                    type="button"
                    key={p.slug}
                    onClick={() => setSlug(p.slug)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      slug === p.slug
                        ? "border-chocolate bg-blush"
                        : "border-border-subtle bg-white hover:border-caramel"
                    }`}
                  >
                    <div className="font-display text-lg font-semibold text-chocolate">
                      {p.name}
                    </div>
                    <div className="font-body text-xs text-chocolate/70">
                      ৳{p.price} · {p.weight}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Field label="Quantity">
              <input
                type="number"
                min={1}
                max={20}
                value={qty}
                onChange={(event) => setQty(Math.max(1, parseInt(event.target.value) || 1))}
                className={inputCx}
              />
            </Field>
            <Field label="Your name">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tasnim"
                className={inputCx}
                required
              />
            </Field>
            <Field label="Delivery area (Dhaka)">
              <input
                value={area}
                onChange={(event) => setArea(event.target.value)}
                placeholder="e.g. Gulshan 1, Banani, Dhanmondi"
                list="dhaka-areas"
                className={inputCx}
                required
              />
              <datalist id="dhaka-areas">
                {DHAKA_AREAS.map((deliveryArea) => (
                  <option key={deliveryArea} value={deliveryArea} />
                ))}
              </datalist>
            </Field>
            <Field label={`Note for the tin (optional, up to ${TIN_NOTE_WORD_LIMIT} words)`}>
              <textarea
                value={note}
                onChange={(event) => setNote(limitToWordCount(event.target.value))}
                rows={3}
                placeholder="Happy birthday, Mishu!"
                className={`${inputCx} resize-y`}
                aria-describedby="tin-note-word-count"
              />
              <p id="tin-note-word-count" className="mt-2 font-body text-xs text-chocolate/60">
                {noteWordCount} of {TIN_NOTE_WORD_LIMIT} words
              </p>
            </Field>
            <Field label="How did you hear about Love Doughs? (optional)">
              <input
                value={heardFrom}
                onChange={(event) => setHeardFrom(event.target.value)}
                placeholder="Instagram, a friend, an event..."
                className={inputCx}
              />
            </Field>
            <Field label="Trade Cookies code (optional)">
              <input
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
                placeholder="LD-60-K7Q2"
                list="trade-coupons"
                className={inputCx}
              />
              {savedCoupons.length > 0 && (
                <>
                  <datalist id="trade-coupons">
                    {savedCoupons.map((coupon) => (
                      <option key={coupon.code} value={coupon.code}>
                        {coupon.label} · ৳{coupon.takaValue}
                      </option>
                    ))}
                  </datalist>
                  <p className="mt-2 font-body text-xs text-chocolate/60">
                    Saved from Trade Cookies: {savedCoupons.map((coupon) => coupon.code).join(", ")}
                  </p>
                </>
              )}
            </Field>

            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="order-website">Website</label>
              <input
                id="order-website"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <Btn
              type="submit"
              className="w-full"
              disabled={submissionState === "saving" || submissionState === "saved"}
            >
              {submissionState === "saving"
                ? "Saving your order…"
                : submissionState === "saved"
                  ? "Order saved"
                  : `Save order details · ৳${total}`}
            </Btn>

            <p className="font-body text-xs leading-relaxed text-chocolate/60">
              We store these details in our private order record so we can confirm and fulfil your
              request. Payment and delivery are still confirmed with you on Instagram.
            </p>

            {submissionState === "error" && (
              <p
                className="rounded-xl bg-velvet/10 px-4 py-3 font-body text-sm text-velvet"
                role="alert"
              >
                {submissionError}
              </p>
            )}

            {submissionState === "saved" && (
              <div
                className="rounded-xl bg-cream px-4 py-4 font-body text-sm text-chocolate"
                aria-live="polite"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-caramel" />
                  <span>Order saved — reference {orderId}.</span>
                </div>
                <p className="mt-2 text-xs text-chocolate/70">
                  {messageCopied
                    ? "Your order details are copied. Open Instagram and paste them into a DM to confirm."
                    : `Open Instagram and include reference ${orderId} in your DM to confirm.`}
                </p>
                <ExtBtn href={instaLink()} className="mt-4 w-full">
                  <Instagram className="h-4 w-4" strokeWidth={1.8} />
                  Open Instagram to confirm
                </ExtBtn>
              </div>
            )}
          </form>

          <aside className="rounded-2xl bg-cream p-6">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-xl bg-blush"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <img
                src={imageHover ? product.imageOpenedUrl : product.imageClosedUrl}
                alt={product.imageAlt}
                width={800}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-2xl text-chocolate">{product.name}</h3>
            <p className="mt-1 text-sm italic text-caramel">{product.tagline}</p>
            <dl className="mt-4 space-y-2 font-body text-sm text-chocolate/80">
              <div className="flex justify-between">
                <dt>Tin</dt>
                <dd>৳{product.price}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Quantity</dt>
                <dd>× {qty}</dd>
              </div>
              <div className="flex justify-between border-t border-border-subtle pt-2 font-display text-base font-semibold text-chocolate">
                <dt>Total</dt>
                <dd>৳{total}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-chocolate/60">
              Cash on delivery, bKash, or Nagad on confirmation.
            </p>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

const inputCx =
  "w-full rounded-[10px] border-2 border-border-subtle bg-white px-4 py-3 font-body text-base text-chocolate placeholder:text-caramel/60 focus:border-chocolate focus:outline-none focus:ring-2 focus:ring-caramel/30 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
        {label}
      </label>
      {children}
    </div>
  );
}
