/** Trade Cookies campaign economy & cooldowns */

export const CHIP_TO_TAKA = 1;
export const FREE_CHOCO_CHIPS = 850;
export const FREE_RED_VELVET_CHIPS = 1000;
export const MIN_REDEEM_CHIPS = 30;
export const STACK_COOLDOWN_MS = 25 * 60 * 60 * 1000;
export const REDEEM_LOCK_MS = 7 * 24 * 60 * 60 * 1000;
export const STORAGE_KEY = "love-doughs-tradecookies-v1";

/** sites → chips; round to nearest 10 with ≤5 down, ≥6 up (85→80, 86→90). 1 chip = ৳1 */
export function sitesToChips(sites: number): number {
  if (!Number.isFinite(sites) || sites < 0) return 0;
  const raw = sites / 10 + 20;
  const base = Math.floor(raw / 10) * 10;
  const rem = raw - base;
  return rem <= 5 ? base : base + 10;
}

export function formatDuration(ms: number): string {
  if (ms <= 0) return "now";
  const h = Math.floor(ms / (60 * 60 * 1000));
  const m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  if (h >= 24) {
    const d = Math.floor(h / 24);
    const rh = h % 24;
    return rh > 0 ? `${d}d ${rh}h` : `${d}d`;
  }
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
  return `${Math.max(1, m)}m`;
}

export function randomCodeSuffix(len = 4): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function makeCouponCode(takaValue: number): string {
  return `LD-${takaValue}-${randomCodeSuffix()}`;
}
