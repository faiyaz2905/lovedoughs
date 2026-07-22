import {
  FREE_CHOCO_CHIPS,
  FREE_RED_VELVET_CHIPS,
  MIN_REDEEM_CHIPS,
  REDEEM_LOCK_MS,
  STACK_COOLDOWN_MS,
  STORAGE_KEY,
  makeCouponCode,
  sitesToChips,
} from "./config";

export type TradeSubmission = {
  at: string;
  siteCount: number;
  chipsAwarded: number;
};

export type TradeCoupon = {
  code: string;
  takaValue: number;
  label: string;
  at: string;
  email?: string;
  used?: boolean;
};

export type TradeProfile = {
  email?: string;
  chips: number;
  submissions: TradeSubmission[];
  coupons: TradeCoupon[];
  lastAwardAt?: string;
  redeemLockedUntil?: string;
};

function emptyProfile(): TradeProfile {
  return {
    chips: 0,
    submissions: [],
    coupons: [],
  };
}

export function loadProfile(): TradeProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    const parsed = JSON.parse(raw) as TradeProfile;
    return {
      ...emptyProfile(),
      ...parsed,
      submissions: parsed.submissions ?? [],
      coupons: parsed.coupons ?? [],
      chips: Number(parsed.chips) || 0,
    };
  } catch {
    return emptyProfile();
  }
}

export function saveProfile(profile: TradeProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function msUntilStackAllowed(profile: TradeProfile, now = Date.now()): number {
  if (profile.redeemLockedUntil) {
    const lockLeft = new Date(profile.redeemLockedUntil).getTime() - now;
    if (lockLeft > 0) return lockLeft;
  }
  if (!profile.lastAwardAt) return 0;
  const next = new Date(profile.lastAwardAt).getTime() + STACK_COOLDOWN_MS;
  return Math.max(0, next - now);
}

export function msUntilRedeemLockEnds(profile: TradeProfile, now = Date.now()): number {
  if (!profile.redeemLockedUntil) return 0;
  return Math.max(0, new Date(profile.redeemLockedUntil).getTime() - now);
}

export function isRedeemLocked(profile: TradeProfile, now = Date.now()): boolean {
  return msUntilRedeemLockEnds(profile, now) > 0;
}

export type AwardResult =
  | { ok: true; profile: TradeProfile; chipsAwarded: number }
  | { ok: false; reason: string; waitMs?: number };

export function awardChips(
  profile: TradeProfile,
  siteCount: number,
  now = Date.now(),
): AwardResult {
  const wait = msUntilStackAllowed(profile, now);
  if (wait > 0) {
    const locked = isRedeemLocked(profile, now);
    return {
      ok: false,
      reason: locked
        ? "Trades are paused for 7 days after you redeem a coupon."
        : "You can trade again 25 hours after your last successful trade.",
      waitMs: wait,
    };
  }

  const chipsAwarded = sitesToChips(siteCount);
  if (chipsAwarded <= 0) {
    return { ok: false, reason: "That site count is too low to trade." };
  }

  const next: TradeProfile = {
    ...profile,
    chips: profile.chips + chipsAwarded,
    lastAwardAt: new Date(now).toISOString(),
    submissions: [
      ...profile.submissions,
      {
        at: new Date(now).toISOString(),
        siteCount,
        chipsAwarded,
      },
    ],
  };
  saveProfile(next);
  return { ok: true, profile: next, chipsAwarded };
}

export type RedeemResult =
  | { ok: true; profile: TradeProfile; coupon: TradeCoupon }
  | { ok: false; reason: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function redeemChips(
  profile: TradeProfile,
  takaValue: number,
  label: string,
  email: string,
  now = Date.now(),
): RedeemResult {
  const trimmedEmail = email.trim().toLowerCase();
  if (!EMAIL_RE.test(trimmedEmail)) {
    return { ok: false, reason: "Enter a valid email so we can send your coupon details." };
  }

  const amount = Math.floor(takaValue);
  if (amount < MIN_REDEEM_CHIPS) {
    return { ok: false, reason: `Minimum redeem is ${MIN_REDEEM_CHIPS} chips (৳${MIN_REDEEM_CHIPS}).` };
  }
  if (profile.chips < amount) {
    return { ok: false, reason: "Not enough chips for that coupon." };
  }

  const coupon: TradeCoupon = {
    code: makeCouponCode(amount),
    takaValue: amount,
    label,
    at: new Date(now).toISOString(),
    email: trimmedEmail,
  };

  const next: TradeProfile = {
    ...profile,
    email: trimmedEmail,
    chips: profile.chips - amount,
    coupons: [...profile.coupons, coupon],
    redeemLockedUntil: new Date(now + REDEEM_LOCK_MS).toISOString(),
  };
  saveProfile(next);
  return { ok: true, profile: next, coupon };
}

export function getUnusedCoupons(profile: TradeProfile): TradeCoupon[] {
  return profile.coupons.filter((c) => !c.used);
}

export function markCouponUsed(profile: TradeProfile, code: string): TradeProfile {
  const next: TradeProfile = {
    ...profile,
    coupons: profile.coupons.map((c) =>
      c.code === code ? { ...c, used: true } : c,
    ),
  };
  saveProfile(next);
  return next;
}

export function chipsToFreeTinProgress(chips: number) {
  return {
    chocoLeft: Math.max(0, FREE_CHOCO_CHIPS - chips),
    redVelvetLeft: Math.max(0, FREE_RED_VELVET_CHIPS - chips),
    canFreeChoco: chips >= FREE_CHOCO_CHIPS,
    canFreeRedVelvet: chips >= FREE_RED_VELVET_CHIPS,
  };
}
