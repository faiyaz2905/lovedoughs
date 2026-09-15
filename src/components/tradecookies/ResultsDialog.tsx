import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Btn, ExtBtn, LinkBtn } from "@/components/Button";
import {
  FREE_CHOCO_CHIPS,
  FREE_RED_VELVET_CHIPS,
  MIN_REDEEM_CHIPS,
  formatDuration,
} from "@/lib/tradecookies/config";
import {
  chipsToFreeTinProgress,
  redeemChips,
  type TradeCoupon,
  type TradeProfile,
} from "@/lib/tradecookies/storage";
import { instaLink } from "@/lib/products";
import { useEffect, useState } from "react";
import { Check, Copy, Instagram } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: TradeProfile;
  onProfileChange: (p: TradeProfile) => void;
  lastAward?: { siteCount: number; chipsAwarded: number } | null;
  stackWaitMs: number;
};

const inputCx =
  "w-full rounded-[10px] border-2 border-border-subtle bg-white px-4 py-3 font-body text-base text-chocolate placeholder:text-caramel/60 focus:border-chocolate focus:outline-none focus:ring-2 focus:ring-caramel/30 transition";

export function ResultsDialog({
  open,
  onOpenChange,
  profile,
  onProfileChange,
  lastAward,
  stackWaitMs,
}: Props) {
  const [error, setError] = useState("");
  const [minted, setMinted] = useState<TradeCoupon | null>(null);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState(profile.email ?? "");
  const progress = chipsToFreeTinProgress(profile.chips);

  useEffect(() => {
    if (open) {
      setEmail(profile.email ?? "");
      setError("");
    }
  }, [open, profile.email]);

  function handleRedeem(amount: number, label: string) {
    setError("");
    const result = redeemChips(profile, amount, label, email);
    if (!result.ok) {
      setError(result.reason);
      return;
    }
    onProfileChange(result.profile);
    setMinted(result.coupon);
  }

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border-subtle bg-cream text-chocolate sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-chocolate">
            {minted ? "Coupon ready" : "Chips traded"}
          </DialogTitle>
          <DialogDescription className="font-body text-chocolate/70">
            {minted
              ? "Trades pause for 7 days after redeem. Paste your code when you order on Instagram."
              : "1 chip = ৳1. Stack after 25 hours, or redeem now."}
          </DialogDescription>
        </DialogHeader>

        {!minted && lastAward && (
          <p className="rounded-xl bg-white px-4 py-3 font-body text-sm text-chocolate shadow-sm">
            <span className="font-semibold">{lastAward.siteCount} sites</span>
            {" → "}
            <span className="font-semibold text-caramel">
              {lastAward.chipsAwarded} chips (৳{lastAward.chipsAwarded})
            </span>
          </p>
        )}

        <div className="rounded-xl border border-border-subtle bg-white p-4">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
            Balance
          </p>
          <p className="mt-1 font-display text-4xl font-semibold text-chocolate">
            {profile.chips} <span className="text-xl text-caramel">chips · ৳{profile.chips}</span>
          </p>
          <ul className="mt-3 space-y-1 font-body text-sm text-chocolate/75">
            <li>
              {progress.canFreeChoco
                ? "You’ve unlocked a free Chocolate Chip tin."
                : `${progress.chocoLeft} chips from a free Chocolate Chip tin (৳${FREE_CHOCO_CHIPS}).`}
            </li>
            <li>
              {progress.canFreeRedVelvet
                ? "You’ve unlocked a free Red Velvet tin."
                : `${progress.redVelvetLeft} chips from a free Red Velvet tin (৳${FREE_RED_VELVET_CHIPS}).`}
            </li>
          </ul>
        </div>

        {minted ? (
          <div className="space-y-3 rounded-xl bg-blush p-4">
            <p className="font-body text-sm text-chocolate/80">{minted.label}</p>
            <p className="font-display text-2xl font-semibold tracking-wide text-chocolate">
              {minted.code}
            </p>
            <p className="font-body text-xs text-chocolate/60">
              Worth ৳{minted.takaValue}
              {minted.email ? ` · ${minted.email}` : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              <Btn type="button" onClick={() => copyCode(minted.code)}>
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy code"}
              </Btn>
              <ExtBtn href={instaLink()}>
                <Instagram className="h-4 w-4" />
                Open Instagram
              </ExtBtn>
              <LinkBtn to="/order" variant="secondary">
                Order with code
              </LinkBtn>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              Redeem
            </p>
            {profile.chips >= MIN_REDEEM_CHIPS && (
              <div>
                <label className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={inputCx}
                  autoComplete="email"
                  required
                />
                <p className="mt-2 font-body text-xs text-chocolate/60">
                  Required to redeem — we use this to match your coupon when you order.
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {profile.chips >= MIN_REDEEM_CHIPS && (
                <Btn
                  type="button"
                  variant="secondary"
                  onClick={() => handleRedeem(profile.chips, `৳${profile.chips} off any tin`)}
                >
                  Redeem all · ৳{profile.chips} off
                </Btn>
              )}
              {progress.canFreeChoco && (
                <Btn
                  type="button"
                  onClick={() => handleRedeem(FREE_CHOCO_CHIPS, "Free Chocolate Chip tin")}
                >
                  Free Chocolate Chip tin (৳{FREE_CHOCO_CHIPS})
                </Btn>
              )}
              {progress.canFreeRedVelvet && (
                <Btn
                  type="button"
                  onClick={() => handleRedeem(FREE_RED_VELVET_CHIPS, "Free Red Velvet tin")}
                >
                  Free Red Velvet tin (৳{FREE_RED_VELVET_CHIPS})
                </Btn>
              )}
              {profile.chips < MIN_REDEEM_CHIPS && (
                <p className="font-body text-sm text-chocolate/70">
                  Need at least {MIN_REDEEM_CHIPS} chips to redeem. Stack another trade after the
                  cooldown.
                </p>
              )}
            </div>
            {error && <p className="font-body text-sm text-velvet">{error}</p>}
          </div>
        )}

        <DialogFooter className="flex-col items-stretch gap-2 sm:flex-col">
          {!minted && (
            <p className="font-body text-sm text-chocolate/70">
              {stackWaitMs > 0 ? (
                <>
                  Next trade unlocks in{" "}
                  <span className="font-semibold text-chocolate">
                    {formatDuration(stackWaitMs)}
                  </span>
                  .
                </>
              ) : (
                <>You can stack another last-24h screenshot when ready.</>
              )}
            </p>
          )}
          {minted && (
            <p className="flex items-start gap-2 font-body text-sm text-chocolate/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
              Trades locked for 7 days. Come order with your code.
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
