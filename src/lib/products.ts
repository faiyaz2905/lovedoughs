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
  imageClosedUrl: string;
  imageOpenedUrl: string;
  imageAlt: string;
};

import ccClosed from "@/assets/Choco Chip Closed.png";
import ccOpened from "@/assets/Choco Chip Opened.png";
import rvClosed from "@/assets/Red Velvet Closed.png";
import rvOpened from "@/assets/Red Velvet Opened.png";

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
    imageClosedUrl: ccClosed,
    imageOpenedUrl: ccOpened,
    imageAlt:
      "Gold tin of Love Doughs Chocolate Chip cookie dough with a red ribbon, on a blush pink background.",
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
    price: 1000,
    scoopCopy: "this one's for love",
    accent: "velvet",
    imageClosedUrl: rvClosed,
    imageOpenedUrl: rvOpened,
    imageAlt:
      "Gold tin of Love Doughs Red Velvet cookie dough with a red ribbon, on a blush pink background.",
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const INSTAGRAM_HANDLE = "love.doughs";
export const instaLink = () => `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;