import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import type { DonationCheckoutResponse, DonationMode } from "@/features/donations";
import { getStripe } from "@/server/stripe";

const MIN_AMOUNT_EUR = 1;
const MAX_AMOUNT_EUR = 10000;

type CheckoutBody = {
  mode?: unknown;
  amount?: unknown;
};

function getSiteOrigin(request: NextRequest): string {
  const configured = process.env["NEXT_PUBLIC_SITE_URL"]?.trim();
  if (configured && /^https?:\/\//.test(configured)) {
    return new URL(configured).origin;
  }

  return request.nextUrl.origin;
}

function getSuccessUrl(request: NextRequest, mode: DonationMode): string {
  const configured = process.env["STRIPE_PORTAL_RETURN_URL"]?.trim();
  const successUrl =
    configured && /^https?:\/\//.test(configured)
      ? new URL(configured)
      : new URL("/donate/gracias", getSiteOrigin(request));

  successUrl.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
  successUrl.searchParams.set("mode", mode);
  return successUrl.toString();
}

function getCancelUrl(request: NextRequest, mode: DonationMode): string {
  const cancelUrl = new URL("/donate/cancelado", getSiteOrigin(request));
  cancelUrl.searchParams.set("mode", mode);
  return cancelUrl.toString();
}

function isDonationMode(mode: unknown): mode is DonationMode {
  return mode === "one_time" || mode === "monthly";
}

function toAmountInCents(amount: unknown): number | null {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null;
  if (amount < MIN_AMOUNT_EUR || amount > MAX_AMOUNT_EUR) return null;

  const cents = Math.round(amount * 100);
  return cents > 0 ? cents : null;
}

export async function POST(request: NextRequest): Promise<NextResponse<DonationCheckoutResponse>> {
  let body: CheckoutBody;
  try {
    body = await request.json() as CheckoutBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Solicitud inválida." },
      { status: 400 }
    );
  }

  if (!isDonationMode(body.mode)) {
    return NextResponse.json(
      { success: false, error: "Tipo de donación no válido." },
      { status: 422 }
    );
  }

  const amountInCents = toAmountInCents(body.amount);
  if (amountInCents === null) {
    return NextResponse.json(
      { success: false, error: "La cantidad indicada no es válida." },
      { status: 422 }
    );
  }

  const mode = body.mode;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: mode === "monthly" ? "subscription" : "payment",
    success_url: getSuccessUrl(request, mode),
    cancel_url: getCancelUrl(request, mode),
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amountInCents,
          product_data: {
            name: "Donación a Hablemos Claro",
            description:
              mode === "monthly"
                ? "Suscripción mensual de apoyo a Hablemos Claro"
                : "Aportación puntual de apoyo a Hablemos Claro"
          },
          ...(mode === "monthly"
            ? { recurring: { interval: "month" as const } }
            : {})
        }
      }
    ],
    metadata: {
      donation_mode: mode,
      donation_amount_cents: String(amountInCents),
      donation_currency: "eur"
    }
  };

  if (mode === "monthly") {
    sessionParams.subscription_data = {
      metadata: {
        donation_mode: "monthly",
        donation_amount_cents: String(amountInCents),
        donation_currency: "eur"
      }
    };
  } else {
    sessionParams.customer_creation = "always";
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      return NextResponse.json(
        { success: false, error: "No se pudo obtener la URL de pago de Stripe." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, checkoutUrl: session.url },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear la sesión de pago.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
