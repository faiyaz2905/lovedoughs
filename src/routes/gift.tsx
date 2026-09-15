import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { LinkBtn } from "@/components/Button";
import { products, type Product } from "@/lib/products";
import { HeartDoodle, Sparkle, HappyStarDoodle, HappyCookieDoodle } from "@/components/Doodles";
import { canonicalLink, DEFAULT_OG_IMAGE, absoluteUrl, DHAKA_AREAS } from "@/lib/site";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: "Gift Cookie Dough Tins in Dhaka | Love Doughs" },
      {
        name: "description",
        content:
          "Send a scoopable cookie dough tin as a gift in Dhaka. Hand-tied red ribbon, a personal note, and delivery across Gulshan, Banani, Dhanmondi, and more.",
      },
      { property: "og:title", content: "Gift Cookie Dough Tins in Dhaka | Love Doughs" },
      {
        property: "og:description",
        content: "Ribbon-tied edible cookie dough tins, delivered with your note across Dhaka.",
      },
      { property: "og:url", content: absoluteUrl("/gift") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [canonicalLink("/gift")],
  }),
  component: GiftPage,
});

function GiftPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-28 text-center lg:px-12">
        <SectionLabel>Gift this</SectionLabel>
        <h1 className="mt-4 font-display text-5xl font-bold text-chocolate md:text-7xl">
          The tin <span className="italic">does the talking.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-chocolate/80">
          Every order ships gift-ready: gold tin, red satin ribbon, a small note card with your
          message in our handwriting.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-3 lg:px-12">
        {[
          { t: "1. Pick a tin", b: "Chocolate Chip, Red Velvet, or one of each." },
          {
            t: "2. Tell us the note",
            b: "Birthday, apology, just-because — we write it in by hand.",
          },
          {
            t: "3. We deliver in Dhaka",
            b: `Choose a date. Tin arrives ribbon-tied across ${DHAKA_AREAS.slice(0, 5).join(", ")}, and more.`,
          },
        ].map((s) => (
          <div
            key={s.t}
            className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(71,26,20,0.08)]"
          >
            <h2 className="font-display text-2xl text-chocolate">{s.t}</h2>
            <p className="mt-3 font-body text-chocolate/75">{s.b}</p>
          </div>
        ))}
      </section>

      <section className="relative bg-cream py-24 overflow-hidden">
        <Sparkle className="absolute left-12 top-12 h-8 w-8 text-gold" />
        <HeartDoodle className="absolute right-16 bottom-16 h-10 w-10 text-velvet/50" />
        <HappyStarDoodle className="absolute left-[8%] bottom-6 h-20 w-20 text-gold/60 hidden md:block" />
        <HappyCookieDoodle className="absolute right-[8%] top-6 h-20 w-20 text-chocolate/40 hidden md:block" />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <h2 className="font-display text-4xl font-semibold text-chocolate md:text-5xl">
            Send one in three taps.
          </h2>
          <p className="mt-4 font-body text-lg text-chocolate/75">
            Message us on Instagram with the flavour, recipient address, delivery date, and your
            note. We confirm within an hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/order?entry=gift_page"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-chocolate px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-[0_4px_16px_rgba(71,26,20,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-caramel hover:shadow-[0_10px_24px_rgba(71,26,20,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-blush"
            >
              Start a gift order
            </a>
            <LinkBtn to="/flavors" variant="secondary">
              Browse flavours
            </LinkBtn>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((p) => (
            <GiftProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function GiftProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to="/flavors/$slug"
      params={{ slug: product.slug }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(71,26,20,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(71,26,20,0.18)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-blush">
        <img
          src={hover ? product.imageOpenedUrl : product.imageClosedUrl}
          alt={product.imageAlt}
          width={800}
          height={640}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {product.accent === "velvet" && (
          <span className="absolute left-6 top-6 -rotate-[4deg] rounded-sm bg-velvet px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-md">
            New
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-chocolate group-hover:text-caramel transition-colors">
          {product.name} — ৳{product.price}
        </h3>
        <p className="mt-2 font-body text-sm text-chocolate/75">{product.tagline}</p>
      </div>
    </Link>
  );
}
