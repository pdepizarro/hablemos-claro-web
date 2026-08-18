import { Highlight, Section, SectionTitle } from "@/shared/ui";

import { DonationForm } from "./DonationForm";

export function DonatePageContent() {
  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <SectionTitle as="h1">
              <Highlight>Compra libertad</Highlight>
            </SectionTitle>
            <p className="mt-4 text-hc-muted">
              Tu aportación económica sostiene actividades, materiales y organización territorial.
              Cada euro contribuye a construir una alternativa firme y constructiva.
            </p>
          </div>

          <div className="rounded-hc-lg border border-white/15 bg-white/5 p-8 shadow-hc-card">
            <DonationForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
