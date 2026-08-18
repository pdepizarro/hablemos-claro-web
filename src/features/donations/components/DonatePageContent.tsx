import { Highlight, Section, SectionTitle } from "@/shared/ui";

import { DonationForm } from "./DonationForm";

export function DonatePageContent() {
  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <SectionTitle as="h1">
              <Highlight>Compra libertad</Highlight>
            </SectionTitle>
            <p className="mt-4 text-hc-muted sm:text-lg">
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
