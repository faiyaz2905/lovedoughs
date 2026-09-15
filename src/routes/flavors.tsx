import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { SectionLabel } from "@/components/SectionLabel";
import { canonicalLink, jsonLdScript, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site";
import { catalogItemListSchema } from "@/lib/schema";

export const Route = createFileRoute("/flavors")({
  head: () => ({
    meta: [
      { title: "Scoopable Cookie Dough Flavours | Love Doughs" },
      {
        name: "description",
        content:
          "Two scoopable cookie dough tins: Chocolate Chip and Red Velvet. 500g each, ribbon-tied gold tins, made in tiny batches in Dhaka, Bangladesh.",
      },
      { property: "og:title", content: "Scoopable Cookie Dough Flavours | Love Doughs" },
      {
        property: "og:description",
        content: "Two tins. One ribbon each. Pick your scoopable cookie dough.",
      },
      { property: "og:url", content: absoluteUrl("/flavors") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [canonicalLink("/flavors")],
    scripts: [jsonLdScript(catalogItemListSchema())],
  }),
  component: FlavorsLayout,
});

function FlavorsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/flavors/$slug");
  if (isChild) return <Outlet />;
  return <FlavorsIndex />;
}

function FlavorsIndex() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-12">
        <div className="text-center">
          <SectionLabel>The full menu (it's short)</SectionLabel>
          <h1 className="mt-4 font-display text-5xl font-bold text-chocolate md:text-7xl">
            Two tins, <span className="italic">two moods.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-body text-lg text-chocolate/80">
            Hover, tap, peek inside. Every tin is hand-scooped edible cookie dough, ribbon-tied, and
            made for someone (maybe you).
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
