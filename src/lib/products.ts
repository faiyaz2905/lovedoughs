export type Product = {
  slug: "chocolate-chip" | "red-velvet";
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  flavorTags: string[];
  weight: string;
  price: number;
  scoopCopy: string;
  accent: "chocolate" | "velvet";
  imageUrl: string;
  imageAlt: string;
};

import cc from "@/assets/chocolate-chip.png.asset.json";
import rv from "@/assets/red-velvet.png.asset.json";

export const products: Product[] = [
  {
    slug: "chocolate-chip",
    name: "Chocolate Chip",
    tagline: "Dark chocolate everything.",
    description:
      "A tin packed with our soft, scoopable cookie dough — folded with dark chocolate chips and finished with a slow drizzle of melted chocolate.",
    longDescription:
      "Heat-treated flour. Pasteurized egg-free base. Real butter. Dark chocolate from our favourite Dhaka chocolatier, folded by hand. Eat it cold from the tin with a spoon, or bake a few scoops at 180°C for eight minutes — both are correct answers.",
    flavorTags: ["Dark Chocolate Chips", "Slow-drizzled Ganache", "Brown Butter Base"],
    weight: "500g",
    price: 850,
    scoopCopy: "a scoop of this, pls",
    accent: "chocolate",
    imageUrl: cc.url,
    imageAlt:
      "Open gold tin of Love Doughs Chocolate Chip cookie dough with a red ribbon, scooped with a spoon and finished with a pool of dark chocolate, set on a blush pink background.",
  },
  {
    slug: "red-velvet",
    name: "Red Velvet",
    tagline: "White chocolate dream.",
    description:
      "Cocoa-rich red velvet dough laced with creamy white chocolate chips. Soft, fudgy, and the colour of a love letter.",
    longDescription:
      "Real cocoa, a whisper of vanilla, and proper white chocolate chunks. Same heat-treated flour and egg-free base — safe to eat by the spoonful, beautiful baked into puffy cookies. A gift that arrives already wearing a red ribbon.",
    flavorTags: ["White Chocolate Chunks", "Cocoa Red Velvet", "Vanilla Bean"],
    weight: "500g",
    price: 900,
    scoopCopy: "this one's for love",
    accent: "velvet",
    imageUrl: rv.url,
    imageAlt:
      "Open gold tin of Love Doughs Red Velvet cookie dough with a red ribbon, scooped with a spoon, white chocolate chips dotted through the deep red dough, on a blush pink background.",
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const WHATSAPP_NUMBER = "8801700000000";
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;