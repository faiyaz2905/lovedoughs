import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { HeroPlates } from "@/components/HeroPlates";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { LinkBtn } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { Sparkle, HeartDoodle, WigglyArrow, HappyStarDoodle } from "@/components/Doodles";

export const Route = createFileRoute("/index/old")(  {
  head: () => ({
    meta: [
      { title: "Love Doughs — Cookie Dough Tins, Made With Love in Dhaka" },
      { name: "description", content: "Bangladesh's first edible cookie dough tins, ribbon-tied and gift-ready. Chocolate Chip and Red Velvet, made in tiny Dhaka batches." },
      { property: "og:title", content: "Love Doughs — Cookie Dough Tins" },
      { property: "og:description", content: "A scoop of dough, a ribbon on top." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell minimalHeader>
      <HeroPlates />

      {/* Two flavours showcase */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>Two tins. One ribbon each.</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-chocolate md:text-6xl">
            Pick the dough <br className="hidden md:block" />
            <span className="italic">that loves you back.</span>
          </h2>
          <p className="mt-6 max-w-xl font-body text-base text-chocolate/80 md:text-lg">
            Both tins are 500g of soft, safe-to-eat dough. Heat-treated flour, no raw eggs, real butter. Eat it cold. Or bake it. We won't tell.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <WigglyArrow className="absolute -top-10 left-1/2 hidden h-14 w-32 -translate-x-1/2 rotate-12 text-caramel md:block" />
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Brand story strip */}
      <section className="relative bg-cream py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 lg:px-12">
          <div>
            <SectionLabel>Our (short) story</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-chocolate md:text-5xl">
              Started in a Dhaka kitchen, with one stubborn rolling pin and a soft spot for dessert at midnight.
            </h2>
            <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-chocolate/80">
              We couldn't find a single tin of edible cookie dough in Dhaka — so we made one. Two flavours, a gold tin, a red ribbon, and a recipe we've been quietly perfecting for two years.
            </p>
            <div className="mt-8">
              <LinkBtn to="/story" variant="secondary">Read the long version</LinkBtn>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 z-10 rotate-[-6deg] rounded-2xl bg-white p-3 shadow-lg">
              <img src={products[1].imageClosedUrl} alt={products[1].imageAlt} className="h-44 w-36 rounded-xl object-cover" />
              <p className="mt-2 text-center font-display text-sm italic text-velvet">red velvet, hi.</p>
            </div>
            <div className="relative ml-auto w-[78%] overflow-hidden rounded-3xl bg-blush shadow-xl">
              <img src={products[0].imageClosedUrl} alt={products[0].imageAlt} className="aspect-[4/5] w-full object-cover" />
            </div>
            <HappyStarDoodle className="absolute -bottom-8 -left-6 h-16 w-16 text-gold hidden md:block" />
            <Sparkle className="absolute -bottom-6 right-6 h-10 w-10 text-gold" />
            <HeartDoodle className="absolute bottom-12 left-8 h-6 w-6 text-velvet" />
          </div>
        </div>
      </section>

      {/* Gifting CTA strip */}
      <section className="relative overflow-hidden bg-blush py-24 lg:py-32">
        <HeartDoodle className="absolute left-[6%] top-1/2 h-10 w-10 -translate-y-1/2 text-velvet/40" />
        <HeartDoodle className="absolute right-[10%] top-[20%] h-7 w-7 text-gold/60" />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <SectionLabel>Gift this</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-semibold text-chocolate md:text-6xl">
            <span className="doodle-underline">Birthdays.</span> Apologies. Just-because Tuesdays.
          </h2>
          <p className="mt-6 font-body text-lg text-chocolate/80">
            Every tin ships gift-ready with a hand-tied red ribbon and a tiny note card with your message. Add a delivery date when you order — we'll handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkBtn to="/gift">Send a tin</LinkBtn>
            <LinkBtn to="/order" variant="secondary">Order for yourself</LinkBtn>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
