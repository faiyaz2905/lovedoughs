export type TimeWindow = "24h" | "1h" | "7d" | "unknown";

export type OcrParseResult = {
  rawText: string;
  suggestedCount: number | null;
  candidates: number[];
  window: TimeWindow;
  rejected: boolean;
  reason?: string;
};

const REJECT_MSG =
  "We only trade the last 24 hours. Open cookie settings for the past day and try again.";

function detectWindow(text: string): TimeWindow {
  const t = text.toLowerCase();

  const has24 =
    /last\s*24\s*h/.test(t) ||
    /past\s*24\s*h/.test(t) ||
    /24\s*hours?/.test(t) ||
    /past\s*day/.test(t) ||
    /last\s*day/.test(t) ||
    /previous\s*day/.test(t) ||
    /last\s*1\s*day/.test(t);

  const has1h =
    /last\s*(1\s*)?hour/.test(t) ||
    /past\s*hour/.test(t) ||
    /last\s*60\s*min/.test(t);

  const has7d =
    /last\s*7\s*days?/.test(t) ||
    /past\s*7\s*days?/.test(t) ||
    /last\s*week/.test(t) ||
    /past\s*week/.test(t) ||
    /7\s*days?/.test(t);

  // Prefer explicit rejects when mixed with 24h language absent
  if (has1h && !has24) return "1h";
  if (has7d && !has24) return "7d";
  if (has24) return "24h";
  if (has1h) return "1h";
  if (has7d) return "7d";
  return "unknown";
}

function extractCandidates(text: string): number[] {
  const nums = [...text.matchAll(/\b(\d{1,5})\b/g)].map((m) => parseInt(m[1], 10));
  // Filter noise: years, tiny UI chrome
  return [...new Set(nums.filter((n) => n >= 3 && n <= 20000 && n !== 2024 && n !== 2025 && n !== 2026))];
}

function pickSuggested(text: string, candidates: number[]): number | null {
  if (candidates.length === 0) return null;
  const t = text.toLowerCase();
  // Prefer numbers near site/cookie words
  const near: number[] = [];
  for (const m of text.matchAll(/(\d{1,5})\s*(sites?|cookies?|items?|origins?)/gi)) {
    near.push(parseInt(m[1], 10));
  }
  for (const m of text.matchAll(/(sites?|cookies?|items?)\s*[:=]?\s*(\d{1,5})/gi)) {
    near.push(parseInt(m[2], 10));
  }
  const filteredNear = near.filter((n) => n >= 3 && n <= 20000);
  if (filteredNear.length) {
    return Math.max(...filteredNear);
  }
  // If text mentions sites, prefer mid-large candidates
  if (/site|cookie/.test(t)) {
    const mid = candidates.filter((n) => n >= 10 && n <= 5000);
    if (mid.length) return Math.max(...mid);
  }
  return Math.max(...candidates);
}

export function parseOcrText(rawText: string): OcrParseResult {
  const window = detectWindow(rawText);
  const candidates = extractCandidates(rawText);
  const suggestedCount = pickSuggested(rawText, candidates);

  if (window === "1h" || window === "7d") {
    return {
      rawText,
      suggestedCount,
      candidates,
      window,
      rejected: true,
      reason: REJECT_MSG,
    };
  }

  return {
    rawText,
    suggestedCount,
    candidates,
    window,
    rejected: false,
  };
}

export async function runScreenshotOcr(file: File): Promise<OcrParseResult> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  try {
    const {
      data: { text },
    } = await worker.recognize(file);
    return parseOcrText(text || "");
  } finally {
    await worker.terminate();
  }
}
