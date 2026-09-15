import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { productBySlug, products } from "@/lib/products";
import { LinkBtn } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { Sparkle, HeartDoodle, WigglyArrow } from "@/components/Doodles";
import { motion } from "framer-motion";
import { absoluteUrl, canonicalLink, jsonLdScript, DEFAULT_OG_IMAGE } from "@/lib/site";
import { productSchema, breadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/flavors/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Flavor — Love Doughs" }] };
    const path = `/flavors/${p.slug}`;
    const ogImage = absoluteUrl(p.imageClosedUrl) || DEFAULT_OG_IMAGE;
    const title = `${p.name} Cookie Dough Tin | Love Doughs Dhaka`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:url", content: absoluteUrl(path) },
        { property: "og:image", content: ogImage },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [canonicalLink(path)],
      scripts: [
        jsonLdScript([
          productSchema(p),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Flavours", path: "/flavors" },
            { name: p.name, path },
          ]),
        ]),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-chocolate">That flavour isn't on the menu.</h1>
        <p className="mt-4 text-chocolate/70">We only do two, after all.</p>
        <div className="mt-6">
          <LinkBtn to="/flavors">See both flavours</LinkBtn>
        </div>
      </div>
    </PageShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [lid, setLid] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLid(true), 600);
    return () => clearTimeout(t);
  }, []);

  const other = products.find((p) => p.slug !== product.slug)!;
  const accent = product.accent === "velvet" ? "text-velvet" : "text-chocolate";

  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-20 md:grid-cols-2 md:gap-16 md:pt-28 lg:px-12">
        <div className="relative">
          <div className="absolute -left-4 -top-6 text-caramel">
            <Sparkle className="h-8 w-8" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-blush shadow-[0_24px_64px_rgba(71,26,20,0.18)]">
            <img
              src={lid ? product.imageOpenedUrl : product.imageClosedUrl}
              alt={product.imageAlt}
              width={800}
              height={1000}
              className="h-full w-full object-cover"
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-6 h-16 rounded-full bg-gradient-to-b from-gold via-gold/90 to-gold/60 shadow-lg"
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={lid ? { y: -200, rotate: -15, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
              }}
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.18em] text-chocolate shadow">
              {product.weight}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLid((v) => !v)}
            className="mt-4 text-sm font-semibold text-caramel underline decoration-wavy underline-offset-4 hover:text-chocolate"
          >
            {lid ? "↻ close the tin again" : "↑ lift the lid"}
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <SectionLabel>
            {product.accent === "velvet" ? "Red Velvet Tin" : "Chocolate Chip Tin"}
          </SectionLabel>
          <h1
            className={`mt-3 font-display text-5xl font-bold leading-[0.95] md:text-7xl ${accent}`}
          >
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl italic text-caramel">{product.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {product.flavorTags.map((t: string) => (
              <span
                key={t}
                className="rounded-full bg-blush px-3 py-1.5 font-body text-xs font-medium text-chocolate"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-8 font-body text-lg leading-relaxed text-chocolate/85">
            {product.description}
          </p>
          <p className="mt-4 font-body text-base leading-relaxed text-chocolate/70">
            {product.longDescription}
          </p>

          <div className="mt-10 flex items-baseline gap-3">
            <span className="font-display text-5xl font-semibold text-chocolate">
              ৳{product.price}
            </span>
            <span className="font-body text-sm uppercase tracking-[0.2em] text-chocolate/60">
              / {product.weight} tin
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/order?product=${encodeURIComponent(product.slug)}&entry=flavor_page`}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-chocolate px-8 py-3.5 font-body text-sm font-semibold tracking-wide text-white shadow-[0_4px_16px_rgba(71,26,20,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-caramel hover:shadow-[0_10px_24px_rgba(71,26,20,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 focus-visible:ring-offset-blush"
            >
              Order this tin
            </a>
            <LinkBtn to="/flavors" variant="secondary">
              Browse flavours
            </LinkBtn>
          </div>

          <p className="mt-6 font-body text-sm italic text-chocolate/60">
            Free delivery inside Dhaka on orders of 2+ tins. Ships within 24 hours of baking.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-cream p-8 md:p-14">
          <WigglyArrow className="absolute right-12 top-12 hidden h-14 w-32 -rotate-12 text-caramel md:block" />
          <SectionLabel>The other tin, while you're here</SectionLabel>
          <div className="mt-6 flex flex-col items-start gap-8 md:flex-row md:items-center">
            <img
              src={other.imageClosedUrl}
              alt={other.imageAlt}
              width={144}
              height={176}
              className="h-44 w-36 rounded-2xl object-cover shadow-md"
            />
            <div className="flex-1">
              <h2 className="font-display text-3xl font-semibold text-chocolate md:text-5xl">
                {other.name}
              </h2>
              <p className="mt-2 font-display text-lg italic text-caramel">{other.tagline}</p>
              <p className="mt-3 max-w-lg font-body text-base text-chocolate/75">
                {other.description}
              </p>
            </div>
            <Link
              to="/flavors/$slug"
              params={{ slug: other.slug }}
              className="inline-flex items-center gap-2 rounded-[10px] border-2 border-chocolate px-6 py-3 font-body text-sm font-semibold text-chocolate transition-all hover:-translate-y-0.5 hover:bg-blush"
            >
              <HeartDoodle className="h-4 w-4 text-velvet" />
              Meet {other.name}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
