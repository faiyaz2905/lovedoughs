import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import { appendOrderToGoogleSheet } from "../orders/orders.server";
import { countWords, TIN_NOTE_WORD_LIMIT } from "../orders/tin-note";
import { productBySlug } from "../products";

const requiredText = (maxLength: number) => z.string().trim().min(1).max(maxLength);
const optionalText = (maxLength: number) => z.string().trim().max(maxLength).default("");
const optionalTinNote = z
  .string()
  .trim()
  .max(1_000)
  .refine((value) => countWords(value) <= TIN_NOTE_WORD_LIMIT, {
    message: `Tin notes can be up to ${TIN_NOTE_WORD_LIMIT} words.`,
  })
  .default("");

const orderSubmissionSchema = z.object({
  requestId: z.string().uuid(),
  productSlug: z.enum(["chocolate-chip", "red-velvet"]),
  quantity: z.number().int().min(1).max(20),
  customerName: requiredText(100),
  deliveryArea: requiredText(160),
  note: optionalTinNote,
  couponCode: optionalText(100),
  heardFrom: optionalText(160),
  website: optionalText(200),
  attribution: z.object({
    sourceChannel: optionalText(120),
    firstLandingUrl: optionalText(500),
    orderPageUrl: optionalText(500),
    referrer: optionalText(300),
    entryPoint: optionalText(100),
    utmSource: optionalText(120),
    utmMedium: optionalText(120),
    utmCampaign: optionalText(120),
    utmContent: optionalText(120),
    utmTerm: optionalText(120),
  }),
});

function requireExpectedOrigin() {
  if (process.env.NODE_ENV !== "production") return;

  const origin = getRequestHeader("origin");
  const expectedOrigin = process.env.VITE_SITE_URL ?? "https://lovedoughs.vercel.app";

  try {
    if (!origin || new URL(origin).origin !== new URL(expectedOrigin).origin) {
      throw new Error("Unexpected order submission origin.");
    }
  } catch {
    throw new Error("This order request came from an unrecognized site.");
  }
}

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator(orderSubmissionSchema)
  .handler(async ({ data }) => {
    setResponseHeader("Cache-Control", "no-store");

    if (process.env.VERCEL_ENV === "preview") {
      throw new Error("Order tracking is disabled on preview deployments.");
    }

    requireExpectedOrigin();

    if (data.website) {
      throw new Error("We could not save your order. Please try again.");
    }

    const product = productBySlug(data.productSlug);
    if (!product) throw new Error("That flavour is no longer available.");

    const total = product.price * data.quantity;
    const result = await appendOrderToGoogleSheet({
      requestId: data.requestId,
      submittedAt: new Date().toISOString(),
      productName: product.name,
      quantity: data.quantity,
      unitPrice: product.price,
      total,
      customerName: data.customerName,
      deliveryArea: data.deliveryArea,
      note: data.note,
      couponCode: data.couponCode,
      heardFrom: data.heardFrom,
      attribution: data.attribution,
    });

    return {
      orderId: result.orderId,
      productName: product.name,
      total,
    };
  });
