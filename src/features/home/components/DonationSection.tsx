import { Button, Highlight, Section, SectionTitle } from "@/shared/ui";
import { routes } from "@/shared/config";

export function DonationSection() {
  return (
    <Section id="donar">
      <div className="container">
        <div className="mb-10 text-center">
          <SectionTitle>
            <Highlight>Compra libertad</Highlight>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-hc-muted">
            Tu aportación económica sostiene actividades, materiales y organización territorial.
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-hc-lg border border-white/15 bg-white/5 p-8 shadow-hc-card">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-hc-lg border border-hc-yellow/30 bg-hc-yellow/8 px-4 py-3">
              <p className="font-semibold text-hc-yellow">Donación puntual</p>
              <p className="mt-1 text-sm text-hc-muted">Pago único con tarjeta.</p>
            </div>
            <div className="rounded-hc-lg border border-hc-yellow/30 bg-hc-yellow/8 px-4 py-3">
              <p className="font-semibold text-hc-yellow">Donación mensual</p>
              <p className="mt-1 text-sm text-hc-muted">Suscripción recurrente y gestionable.</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-hc-muted">
            Puedes elegir importes predefinidos o una cantidad personalizada en la siguiente pantalla.
          </p>

          <div className="mt-6 text-center">
            <Button href={routes.donate} size="lg" className="w-full sm:w-auto" aria-label="Donar ahora">
              Donar ahora
            </Button>
            <p className="mt-3 text-sm text-hc-muted">
              Pago seguro con Stripe. Puedes cancelar la suscripción cuando quieras.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
