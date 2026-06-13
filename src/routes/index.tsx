import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { HeroPlates } from "@/components/HeroPlates";

export const Route = createFileRoute("/")({
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
    <PageShell minimalHeader hideFooter>
      <HeroPlates />
    </PageShell>
  );
}
