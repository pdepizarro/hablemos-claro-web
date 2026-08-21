import { Highlight, Section, SectionTitle } from "@/shared/ui";

import { DonationForm } from "./DonationForm";

export function DonatePageContent() {
  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center sm:mb-8">
            <SectionTitle as="h1" className="text-4xl sm:text-5xl">
              <span className="inline-block whitespace-nowrap">
                <Highlight>Compra libertad</Highlight>
              </span>
            </SectionTitle>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-hc-muted sm:mt-3 sm:text-base">
              Elige entre aportación puntual o suscripción mensual para apoyar actividades,
              materiales y organización territorial.
            </p>
          </div>

          <div className="rounded-hc-lg border border-white/15 bg-white/5 p-5 shadow-hc-card sm:p-8">
            <DonationForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
