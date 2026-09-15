import { createSign } from "node:crypto";

import { getGoogleSheetsOrderConfig } from "../config.server";
import type { OrderAttribution } from "./attribution";

const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_API_URL = "https://sheets.googleapis.com/v4";

type GoogleServiceAccount = {
  type?: string;
  private_key_id?: string;
  private_key?: string;
  client_email?: string;
};

type ParsedServiceAccount = {
  private_key_id?: string;
  private_key: string;
  client_email: string;
};

type AccessToken = {
  value: string;
  expiresAt: number;
};

type ValuesResponse = {
  values?: string[][];
};

export type OrderSheetRecord = {
  requestId: string;
  submittedAt: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  customerName: string;
  deliveryArea: string;
  note: string;
  couponCode: string;
  heardFrom: string;
  attribution: OrderAttribution;
};

let cachedToken: AccessToken | undefined;

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function parseServiceAccount(rawValue: string): ParsedServiceAccount {
  try {
    const parsed = JSON.parse(rawValue) as GoogleServiceAccount;
    if (parsed.type !== "service_account" || !parsed.client_email || !parsed.private_key) {
      throw new Error("The supplied credential is not a complete service-account key.");
    }
    return {
      private_key_id: parsed.private_key_id,
      private_key: parsed.private_key,
      client_email: parsed.client_email,
    };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("The supplied")) throw error;
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.");
  }
}

async function getAccessToken(serviceAccount: ParsedServiceAccount) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const now = Math.floor(Date.now() / 1_000);
  const header = base64Url(
    JSON.stringify({
      alg: "RS256",
      typ: "JWT",
      ...(serviceAccount.private_key_id ? { kid: serviceAccount.private_key_id } : {}),
    }),
  );
  const claims = base64Url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: GOOGLE_SHEETS_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      iat: now,
      exp: now + 3_600,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const signature = createSign("RSA-SHA256")
    .update(unsignedToken)
    .end()
    .sign(serviceAccount.private_key, "base64url");

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsignedToken}.${signature}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const payload = (await response.json()) as {
    access_token?: unknown;
    expires_in?: unknown;
  };

  if (!response.ok || typeof payload.access_token !== "string") {
    console.error("Google Sheets token request failed", { status: response.status });
    throw new Error("Google Sheets could not authenticate the order tracker.");
  }

  const expiresInSeconds = typeof payload.expires_in === "number" ? payload.expires_in : 3_600;
  cachedToken = {
    value: payload.access_token,
    expiresAt: Date.now() + expiresInSeconds * 1_000,
  };
  return cachedToken.value;
}

async function googleSheetsRequest<T>(
  accessToken: string,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${GOOGLE_SHEETS_API_URL}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      ...init.headers,
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error("Google Sheets request failed", { status: response.status });
    throw new Error("We could not save your order right now. Please try again shortly.");
  }

  return (await response.json()) as T;
}

function safeCellValue(value: string | number) {
  if (typeof value !== "string") return value;
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function createOrderId(requestId: string) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `LD-${date}-${requestId.replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

function validateSheetTabName(tabName: string) {
  if (!/^[\w -]{1,80}$/.test(tabName)) {
    throw new Error("GOOGLE_SHEETS_ORDERS_TAB contains an unsupported tab name.");
  }
}

async function findExistingOrder(
  accessToken: string,
  spreadsheetId: string,
  tabName: string,
  requestId: string,
) {
  const range = encodeURIComponent(`${tabName}!A2:B`);
  const result = await googleSheetsRequest<ValuesResponse>(
    accessToken,
    `/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}`,
  );
  const existing = result.values?.find(([storedRequestId]) => storedRequestId === requestId);
  return existing?.[1] ?? null;
}

export async function appendOrderToGoogleSheet(record: OrderSheetRecord) {
  const config = getGoogleSheetsOrderConfig();
  if (!config.spreadsheetId || !config.serviceAccountJson) {
    throw new Error("Order tracking has not been configured yet.");
  }

  validateSheetTabName(config.ordersTab);
  const serviceAccount = parseServiceAccount(config.serviceAccountJson);
  const accessToken = await getAccessToken(serviceAccount);
  const existingOrderId = await findExistingOrder(
    accessToken,
    config.spreadsheetId,
    config.ordersTab,
    record.requestId,
  );

  if (existingOrderId) {
    return { orderId: existingOrderId, duplicate: true };
  }

  const orderId = createOrderId(record.requestId);
  const row = [
    record.requestId,
    orderId,
    record.submittedAt,
    "Awaiting Instagram confirmation",
    record.attribution.sourceChannel,
    record.attribution.firstLandingUrl,
    record.attribution.orderPageUrl,
    record.attribution.entryPoint,
    record.attribution.referrer,
    record.attribution.utmSource,
    record.attribution.utmMedium,
    record.attribution.utmCampaign,
    record.attribution.utmContent,
    record.attribution.utmTerm,
    record.heardFrom,
    record.productName,
    record.quantity,
    record.unitPrice,
    record.total,
    record.customerName,
    record.deliveryArea,
    record.note,
    record.couponCode,
    "",
    "Unpaid",
    "Not started",
    "",
  ].map(safeCellValue);

  const range = encodeURIComponent(`${config.ordersTab}!A:AA`);
  await googleSheetsRequest(
    accessToken,
    `/spreadsheets/${encodeURIComponent(config.spreadsheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      body: JSON.stringify({ majorDimension: "ROWS", values: [row] }),
    },
  );

  return { orderId, duplicate: false };
}
