import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SectionLabel } from "@/components/SectionLabel";
import { LinkBtn, ExtBtn } from "@/components/Button";
import { products, waLink } from "@/lib/products";
import { HeartDoodle, Sparkle } from "@/components/Doodles";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/gift")({
  head: () => ({
    meta: [
      { title: "Gift This — Love Doughs" },
      { name: "description", content: "Send a Love Doughs tin as a gift. Hand-tied red ribbon, a personal note, and same-day delivery across Dhaka." },
      { property: "og:title", content: "Gift a Love Doughs tin" },
      { property: "og:description", content: "Ribbon-tied cookie dough tins, delivered with your note." },
    ],
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
          Every order ships gift-ready: gold tin, red satin ribbon, a small note card with your message in our handwriting.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-3 lg:px-12">
        {[
          { t: "1. Pick a tin", b: "Chocolate Chip, Red Velvet, or one of each." },
          { t: "2. Tell us the note", b: "Birthday, apology, just-because — we write it in by hand." },
          { t: "3. We deliver in Dhaka", b: "Choose a date. Tin arrives ribbon-tied, ready to give." },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(71,26,20,0.08)]">
            <h3 className="font-display text-2xl text-chocolate">{s.t}</h3>
            <p className="mt-3 font-body text-chocolate/75">{s.b}</p>
          </div>
        ))}
      </section>

      <section className="relative bg-cream py-24">
        <Sparkle className="absolute left-12 top-12 h-8 w-8 text-gold" />
        <HeartDoodle className="absolute right-16 bottom-16 h-10 w-10 text-velvet/50" />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <h2 className="font-display text-4xl font-semibold text-chocolate md:text-5xl">
            Send one in three taps.
          </h2>
          <p className="mt-4 font-body text-lg text-chocolate/75">
            Message us on WhatsApp with the flavour, recipient address, delivery date, and your note. We confirm within an hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ExtBtn href={waLink("Hi Love Doughs! I'd like to send a gift tin. Here's what I'm thinking…")}>
              <Phone className="h-4 w-4" strokeWidth={1.8} /> Send via WhatsApp
            </ExtBtn>
            <LinkBtn to="/flavors" variant="secondary">Browse flavours</LinkBtn>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((p) => (
            <div key={p.slug} className="overflow-hidden rounded-2xl bg-white shadow-md">
              <img src={p.imageUrl} alt={p.imageAlt} className="aspect-[5/4] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-2xl text-chocolate">{p.name} — ৳{p.price}</h3>
                <p className="mt-2 text-sm text-chocolate/70">{p.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}