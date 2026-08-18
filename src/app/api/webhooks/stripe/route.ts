import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  insertSubscriptionEvent,
  upsertDonationRecord
} from "@/server/donations-db";
import { getStripe } from "@/server/stripe";

type InvoiceWithLinks = Stripe.Invoice & {
  subscription?: string | Stripe.Subscription | null;
  payment_intent?: string | Stripe.PaymentIntent | null;
};

function donationTypeFromSession(session: Stripe.Checkout.Session): "one_time" | "monthly" {
  const metadataType = session.metadata?.["donation_mode"];
  if (metadataType === "monthly") return "monthly";
  if (metadataType === "one_time") return "one_time";
  return session.mode === "subscription" ? "monthly" : "one_time";
}

function asIsoDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString();
}

function currencyOrNull(currency: string | null): string | null {
  return currency ? currency.toLowerCase() : null;
}

function numberOrNull(value: number | null): number | null {
  return typeof value === "number" ? value : null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Falta STRIPE_WEBHOOK_SECRET en variables de entorno." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Firma de Stripe ausente." },
      { status: 400 }
    );
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Firma inválida.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const checkoutSessionId = session.id;
        const customerId = typeof session.customer === "string" ? session.customer : null;
        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : null;
        const paymentIntentId =
          typeof session.payment_intent === "string" ? session.payment_intent : null;

        upsertDonationRecord({
          checkoutSessionId,
          donationType: donationTypeFromSession(session),
          amountCents: numberOrNull(session.amount_total),
          currency: currencyOrNull(session.currency),
          customerId,
          customerEmail: session.customer_details?.email ?? null,
          subscriptionId,
          paymentIntentId,
          status: session.payment_status ?? "completed",
          sourceEventId: event.id,
          sourceEventType: event.type,
          occurredAt: asIsoDate(event.created)
        });
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as InvoiceWithLinks;
        const subscriptionId =
          typeof invoice.subscription === "string" ? invoice.subscription : null;
        if (!subscriptionId) break;

        const customerId = typeof invoice.customer === "string" ? invoice.customer : null;
        const amountCents = numberOrNull(invoice.amount_paid);
        const currency = currencyOrNull(invoice.currency);

        insertSubscriptionEvent({
          subscriptionId,
          customerId,
          customerEmail: invoice.customer_email ?? null,
          status: "paid",
          amountCents,
          currency,
          sourceEventId: event.id,
          sourceEventType: event.type,
          occurredAt: asIsoDate(event.created)
        });

        upsertDonationRecord({
          checkoutSessionId: `invoice:${invoice.id}`,
          donationType: "monthly",
          amountCents,
          currency,
          customerId,
          customerEmail: invoice.customer_email ?? null,
          subscriptionId,
          paymentIntentId: typeof invoice.payment_intent === "string" ? invoice.payment_intent : null,
          status: "paid",
          sourceEventId: event.id,
          sourceEventType: event.type,
          occurredAt: asIsoDate(event.created)
        });
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string" ? subscription.customer : null;
        const item = subscription.items.data[0];
        const amountCents = numberOrNull(item?.price.unit_amount ?? null);
        const currency = currencyOrNull(item?.price.currency ?? null);

        insertSubscriptionEvent({
          subscriptionId: subscription.id,
          customerId,
          customerEmail: null,
          status: subscription.status,
          amountCents,
          currency,
          sourceEventId: event.id,
          sourceEventType: event.type,
          occurredAt: asIsoDate(event.created)
        });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al procesar webhook.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
