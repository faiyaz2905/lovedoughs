import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { HeroPlates } from "@/components/HeroPlates";
import { canonicalLink, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cookie Dough Tins in Dhaka | Love Doughs" },
      {
        name: "description",
        content:
          "Bangladesh's first edible cookie dough tins — scoopable, ribbon-tied, and gift-ready. Chocolate Chip and Red Velvet, made in tiny Dhaka batches.",
      },
      { property: "og:title", content: "Cookie Dough Tins in Dhaka | Love Doughs" },
      {
        property: "og:description",
        content:
          "A scoop of dough, a ribbon on top. Scoopable cookie dough tins delivered across Dhaka.",
      },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [canonicalLink("/")],
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
