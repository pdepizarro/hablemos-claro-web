export const DONATION_PRESET_AMOUNTS = [5, 10, 20, 50, 100] as const;

export type DonationPresetAmount = (typeof DONATION_PRESET_AMOUNTS)[number];

export type DonationMode = "one_time" | "monthly";

export type DonationCheckoutRequest = {
  mode: DonationMode;
  amount: number;
};

export type DonationCheckoutResponse = {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
};

export function resolveDonationAmount(
  presetAmount: DonationPresetAmount | null,
  customAmount: string
): number | null {
  if (presetAmount !== null) return presetAmount;

  const normalized = customAmount.replace(",", ".").trim();
  if (!normalized) return null;

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;

  return Math.round(parsed * 100) / 100;
}
