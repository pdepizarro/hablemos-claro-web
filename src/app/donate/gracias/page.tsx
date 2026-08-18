import type { Metadata } from "next";
import Link from "next/link";

import { CustomerPortalButton } from "@/features/donations/components/CustomerPortalButton";
import { routes } from "@/shared/config";
import { Highlight, Section, SectionTitle } from "@/shared/ui";

type ThankYouPageProps = {
  searchParams?: Promise<{
    session_id?: string;
    mode?: "one_time" | "monthly";
  }>;
};

export const metadata: Metadata = {
  title: "Gracias por tu aportación",
  description: "Confirmación de donación en Hablemos Claro."
};

export default async function DonateThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const sessionId = resolvedParams?.session_id;
  const mode = resolvedParams?.mode;
  const donationKindText =
    mode === "monthly"
      ? "Tu suscripción mensual se ha activado correctamente."
      : "Tu donación puntual se ha recibido correctamente.";

  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-hc-lg border border-hc-yellow/30 bg-white/5 p-6 text-center shadow-hc-card sm:p-10">
          <SectionTitle as="h1">
            <Highlight>Gracias</Highlight>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-tight text-hc-text sm:text-3xl">
            Tu apoyo hace posible que sigamos hablando claro.
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-hc-muted sm:text-lg">
            Hemos recibido correctamente tu apoyo con Stripe. {donationKindText} Gracias por
            sostener este proyecto con tu aportación.
          </p>

          <p className="mt-4 rounded-hc-lg border border-hc-yellow/25 bg-hc-yellow/10 px-4 py-3 text-sm text-hc-yellow">
            Si has elegido suscripción mensual, puedes cancelarla cuando quieras desde el email que te enviará Stripe o contactando con nosotros.
          </p>

          {mode === "monthly" && sessionId && <CustomerPortalButton sessionId={sessionId} />}

          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href={routes.home}
              className="inline-flex rounded bg-hc-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-[#FFD54A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Volver a Hablemos Claro
            </Link>

            <Link
              href={routes.about}
              className="text-base font-semibold text-hc-text underline decoration-hc-yellow/45 underline-offset-4 transition-colors hover:text-hc-yellow"
            >
              Qué hacemos
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
