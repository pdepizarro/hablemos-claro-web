import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionTitle, Highlight } from "@/components/ui/SectionTitle";
import { DonationForm } from "@/features/donations/components/DonationForm";

export const metadata: Metadata = {
  title: "Compra libertad",
  description:
    "Apoya a la asociación Hablemos Claro con tu aportación económica y ayuda a sostener nuestras actividades en toda España."
};

export default function DonatePage() {
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
