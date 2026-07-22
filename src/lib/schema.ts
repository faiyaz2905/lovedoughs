import {
  SITE_URL,
  SITE_NAME,
  absoluteUrl,
  DHAKA_AREAS,
  DEFAULT_OG_IMAGE,
} from "./site";
import { products, INSTAGRAM_HANDLE, type Product } from "./products";

const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
const LOGO_URL = absoluteUrl("/og/logo.png");

const areaServed = DHAKA_AREAS.map((name) => ({
  "@type": "City" as const,
  name,
  containedInPlace: {
    "@type": "City" as const,
    name: "Dhaka",
    containedInPlace: {
      "@type": "Country" as const,
      name: "Bangladesh",
    },
  },
}));

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Bakery"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: DEFAULT_OG_IMAGE,
    description:
      "Bangladesh's first edible cookie dough tin brand. Scoopable, ribbon-tied cookie dough tins made in tiny batches in Dhaka.",
    sameAs: [INSTAGRAM_URL],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dhaka",
        containedInPlace: { "@type": "Country", name: "Bangladesh" },
      },
      ...areaServed,
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} Cookie Dough Tin`,
    description: product.description,
    image: [absoluteUrl(product.imageClosedUrl), absoluteUrl(product.imageOpenedUrl)],
    brand: { "@type": "Brand", name: SITE_NAME },
    sku: product.slug,
    weight: {
      "@type": "QuantitativeValue",
      value: 500,
      unitCode: "GRM",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/flavors/${product.slug}`),
      priceCurrency: "BDT",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "City",
        name: "Dhaka",
        containedInPlace: { "@type": "Country", name: "Bangladesh" },
      },
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export const STORY_FAQS = [
  {
    question: "What is edible scoop cookie dough?",
    answer:
      "Edible cookie dough (sometimes called scoop cookie dough) is soft, spoonable cookie dough made safe to eat raw — no raw eggs, heat-treated flour. Love Doughs serves it in ribbon-tied gold tins you can scoop straight from, or bake into cookies.",
  },
  {
    question: "Is Love Doughs cookie dough safe to eat raw?",
    answer:
      "Yes. Every tin uses heat-treated flour and an egg-free base, so it is safe to eat by the spoonful straight from the tin.",
  },
  {
    question: "Do you deliver cookie dough tins in Dhaka?",
    answer:
      "Yes. We deliver across Dhaka within 24 hours of baking, including areas like Gulshan, Banani, Dhanmondi, Bashundhara, Uttara, Mirpur, Mohakhali, and Lalmatia. Free delivery inside Dhaka on orders of 2+ tins.",
  },
  {
    question: "How do I order Love Doughs?",
    answer:
      "Order via Instagram @love.doughs. Use the order form on lovedoughs.vercel.app/order to copy your details, then send them in a DM. We confirm within about an hour.",
  },
  {
    question: "Are the tins gift-ready?",
    answer:
      "Every tin arrives gift-ready: a gold tin tied with a red satin ribbon, plus an optional handwritten note card — ideal for birthdays, apologies, or just-because gifts in Dhaka.",
  },
  {
    question: "Is Love Doughs the first cookie dough tin brand in Bangladesh?",
    answer:
      "Yes. Love Doughs is Bangladesh's first home-grown bakery serving edible cookie dough in ribbon-tied tins. No other bakery or restaurant in the country offers this.",
  },
] as const;

export function catalogItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Love Doughs Cookie Dough Flavours",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/flavors/${p.slug}`),
      name: `${p.name} Cookie Dough Tin`,
    })),
  };
}
