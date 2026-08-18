import { NextRequest, NextResponse } from "next/server";

import { getStripe } from "@/server/stripe";

type PortalRequestBody = {
  sessionId?: unknown;
};

type PortalResponse = {
  success: boolean;
  url?: string;
  error?: string;
};

function getReturnUrl(request: NextRequest): string {
  const configuredSite = process.env["NEXT_PUBLIC_SITE_URL"]?.trim();
  const configuredPortal = process.env["STRIPE_PORTAL_RETURN_URL"]?.trim();

  if (configuredPortal && /^https?:\/\//.test(configuredPortal)) return configuredPortal;
  if (configuredSite && /^https?:\/\//.test(configuredSite)) return `${configuredSite}/donate`;
  return `${request.nextUrl.origin}/donate`;
}

export async function POST(request: NextRequest): Promise<NextResponse<PortalResponse>> {
  let body: PortalRequestBody;
  try {
    body = await request.json() as PortalRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, error: "Solicitud inválida." },
      { status: 400 }
    );
  }

  if (typeof body.sessionId !== "string" || body.sessionId.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Falta el identificador de sesión de pago." },
      { status: 422 }
    );
  }

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(body.sessionId);
    const customerId = typeof checkoutSession.customer === "string" ? checkoutSession.customer : null;

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "No se encontró cliente asociado a esta sesión para abrir el portal."
        },
        { status: 422 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: getReturnUrl(request)
    });

    return NextResponse.json({ success: true, url: portalSession.url }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo crear el acceso al portal de cliente.";
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
