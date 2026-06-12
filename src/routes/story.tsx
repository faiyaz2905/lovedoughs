import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { LinkBtn } from "@/components/Button";
import { HeartDoodle, Sparkle, WigglyArrow } from "@/components/Doodles";
import { products } from "@/lib/products";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Love Doughs" },
      { name: "description", content: "How a Dhanmondi kitchen and one stubborn rolling pin turned into Bangladesh's first cookie dough tin brand." },
      { property: "og:title", content: "Our Story — Love Doughs" },
      { property: "og:description", content: "Tinned cookie dough, baked with love in Dhaka." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-28 text-center lg:px-12">
        <SectionLabel>Our story</SectionLabel>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[1] text-chocolate md:text-7xl">
          A scoop, <span className="italic">a ribbon,</span> a kitchen in <span className="doodle-underline">Dhanmondi.</span>
        </h1>
      </section>

      <section className="relative mx-auto max-w-3xl px-6 pb-16 font-body text-lg leading-[1.8] text-chocolate/85 lg:px-12">
        <HeartDoodle className="absolute -left-4 top-0 h-6 w-6 text-velvet" />
        <p>
          Love Doughs started the way most good things start in this city: at midnight, with someone craving a dessert that didn't exist here yet. We'd been eating spoonfuls of raw-style cookie dough on every trip abroad and wondering, every time, why nobody in Dhaka was selling it.
        </p>
        <p className="mt-6">
          So in early 2024, we started baking. Heat-treated flour batch after batch. Egg-free formulas that still tasted like the real thing. Soft enough to eat with a spoon, firm enough to bake into proper cookies if you wanted to. Two flavours felt right — chocolate chip for the classics, red velvet for the romantics.
        </p>
        <p className="mt-6">
          Every tin is filled by hand in our small kitchen, weighed to 320 grams, sealed, and tied with a single red ribbon. We don't keep things on a shelf. We bake to order, in tiny batches, and deliver across Dhaka within 24 hours.
        </p>
        <p className="mt-6">
          That's the whole story. There's no big factory, no investor deck, no five-flavour roadmap. Just two tins, made with love, baked with dough.
        </p>
        <Sparkle className="mx-auto mt-12 h-8 w-8 text-gold" />
      </section>

      <section className="relative bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <SectionLabel>Inside every tin</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold text-chocolate md:text-5xl">
              Three rules we never break.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Safe to eat raw", body: "Heat-treated flour and zero raw eggs. Dig in straight from the tin." },
              { title: "Real ingredients", body: "Real butter, real cocoa, real chocolate from local makers. Nothing pretending." },
              { title: "Baked to order", body: "Tins are made the day we deliver. Never sat on a shelf. Never frozen." },
            ].map((c) => (
              <div key={c.title} className="relative rounded-2xl border border-border-subtle bg-white p-8 shadow-[0_8px_24px_rgba(71,26,20,0.08)]">
                <h3 className="font-display text-2xl font-semibold text-chocolate">{c.title}</h3>
                <p className="mt-3 font-body text-base text-chocolate/75">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:px-12">
        <WigglyArrow className="mx-auto h-14 w-32 rotate-180 text-caramel" />
        <h2 className="mt-4 font-display text-4xl font-semibold text-chocolate md:text-5xl">
          Ready for a spoonful?
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {products.map((p) => (
            <LinkBtn key={p.slug} to="/flavors/$slug" variant={p.accent === "velvet" ? "secondary" : "primary"}>
              {p.name} tin
            </LinkBtn>
          ))}
        </div>
      </section>
    </PageShell>
  );
}