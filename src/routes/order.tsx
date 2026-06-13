import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { ExtBtn } from "@/components/Button";
import { products, instaLink, INSTAGRAM_HANDLE } from "@/lib/products";
import { Instagram, Check } from "lucide-react";
import { HappyCupDoodle, HappyStarDoodle } from "@/components/Doodles";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order — Love Doughs" },
      { name: "description", content: `Order your Love Doughs tin. Pick a flavour, fill the form, we confirm on Instagram @${INSTAGRAM_HANDLE} within an hour.` },
      { property: "og:title", content: "Order — Love Doughs" },
      { property: "og:description", content: "Cookie dough tins delivered across Dhaka." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const [slug, setSlug] = useState(products[0].slug);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const product = products.find((p) => p.slug === slug)!;
  const total = product.price * qty;
  const message = `Hi Love Doughs! New order:\n• Flavour: ${product.name}\n• Quantity: ${qty}\n• Name: ${name || "—"}\n• Delivery area (Dhaka): ${area || "—"}\n• Note: ${note || "—"}\n• Total: ৳${total}`;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 lg:px-12 relative">
        <HappyCupDoodle className="absolute left-[-2%] top-[35%] h-20 w-20 text-chocolate/35 hidden xl:block" />
        <HappyStarDoodle className="absolute right-[-2%] bottom-[25%] h-20 w-20 text-gold/60 hidden xl:block" />
        <div className="text-center">
          <SectionLabel>Order a tin</SectionLabel>
          <h1 className="mt-4 font-display text-5xl font-bold text-chocolate md:text-6xl">
            One short form. <span className="italic">One sweet tin.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-body text-base text-chocolate/75">
            We confirm every order on Instagram. Delivery across Dhaka within 24 hours of confirmation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px]">
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-6 rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(71,26,20,0.08)]"
          >
            <div>
              <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">Flavour</label>
              <div className="grid grid-cols-2 gap-3">
                {products.map((p) => (
                  <button
                    type="button"
                    key={p.slug}
                    onClick={() => setSlug(p.slug)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      slug === p.slug ? "border-chocolate bg-blush" : "border-border-subtle bg-white hover:border-caramel"
                    }`}
                  >
                    <div className="font-display text-lg font-semibold text-chocolate">{p.name}</div>
                    <div className="font-body text-xs text-chocolate/70">৳{p.price} · {p.weight}</div>
                  </button>
                ))}
              </div>
            </div>

            <Field label="Quantity">
              <input type="number" min={1} max={20} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} className={inputCx} />
            </Field>
            <Field label="Your name">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tasnim" className={inputCx} required />
            </Field>
            <Field label="Delivery area (Dhaka)">
              <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Gulshan 1" className={inputCx} required />
            </Field>
            <Field label="Note for the tin (optional)">
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Happy birthday, Mishu!" className={inputCx + " resize-y"} />
            </Field>

            <ExtBtn
              href={instaLink()}
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(message);
                setSubmitted(true);
              }}
            >
              <Instagram className="h-4 w-4" strokeWidth={1.8} />
              Send order on Instagram · ৳{total}
            </ExtBtn>

            {submitted && (
              <div className="flex flex-col gap-1 rounded-xl bg-cream px-4 py-3 font-body text-sm text-chocolate">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-caramel" />
                  Order details copied!
                </div>
                <p className="text-xs text-chocolate/70 pl-6">
                  We've opened Instagram. Paste the details in a DM to @{INSTAGRAM_HANDLE} to confirm. 🍪
                </p>
              </div>
            )}
          </form>

          <aside className="rounded-2xl bg-cream p-6">
            <div
              className="overflow-hidden rounded-xl bg-blush relative aspect-[4/5]"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <img
                src={imageHover ? product.imageOpenedUrl : product.imageClosedUrl}
                alt={product.imageAlt}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-display text-2xl text-chocolate">{product.name}</h3>
            <p className="mt-1 text-sm italic text-caramel">{product.tagline}</p>
            <dl className="mt-4 space-y-2 font-body text-sm text-chocolate/80">
              <div className="flex justify-between"><dt>Tin</dt><dd>৳{product.price}</dd></div>
              <div className="flex justify-between"><dt>Quantity</dt><dd>× {qty}</dd></div>
              <div className="flex justify-between border-t border-border-subtle pt-2 font-display text-base font-semibold text-chocolate"><dt>Total</dt><dd>৳{total}</dd></div>
            </dl>
            <p className="mt-4 text-xs text-chocolate/60">Cash on delivery, bKash, or Nagad on confirmation.</p>
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
      <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">{label}</label>
      {children}
    </div>
  );
}