import { Highlight, Section, SectionTitle } from "@/shared/ui";

import { DonationForm } from "./DonationForm";

export function DonatePageContent() {
  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center sm:mb-8">
            <SectionTitle as="h1" className="text-[2.1rem] sm:text-5xl">
              <span className="inline-block whitespace-nowrap">
                <Highlight>Compra libertad</Highlight>
              </span>
            </SectionTitle>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-hc-muted sm:mt-3 sm:text-base">
              Elige entre aportación puntual o suscripción mensual para apoyar actividades,
              materiales y organización territorial.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-hc-lg border border-white/15 bg-white/5 p-5 shadow-hc-card sm:p-8">
            <div inert aria-hidden="true" className="pointer-events-none select-none opacity-40 blur-[3px]">
              <DonationForm />
            </div>

            <div
              role="status"
              className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
            >
              <div className="w-full max-w-md rounded-hc-lg border border-hc-yellow/40 bg-black/85 px-5 py-6 text-center shadow-hc-card sm:px-8 sm:py-8">
                <span
                  aria-hidden="true"
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-hc-yellow/50 bg-hc-yellow/10 text-hc-yellow"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
                  </svg>
                </span>
                <p className="font-heading text-xl font-bold text-hc-yellow sm:text-2xl">
                  Estamos trabajando en las donaciones
                </p>
                <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-hc-red via-hc-yellow to-hc-red" aria-hidden="true" />
                <p className="mt-3 text-sm text-hc-muted sm:text-base">
                  Muy pronto podrás apoyar a Hablemos Claro desde aquí. Gracias por tu interés y tu paciencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
