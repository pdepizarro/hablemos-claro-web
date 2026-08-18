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
          {/* Nota visible: integración Stripe pendiente */}
          <p className="mb-6 rounded border border-hc-yellow/40 bg-hc-yellow/10 px-4 py-3 text-sm text-hc-yellow">
            La pasarela de pago quedará disponible próximamente. Estamos preparando la integración
            con Stripe.
          </p>

          <form aria-label="Formulario de donación" noValidate>
            <fieldset className="mb-6">
              <legend className="mb-3 font-semibold text-hc-text">Selecciona un importe</legend>
              <div className="flex flex-wrap gap-3">
                {[10, 30, 50].map((amount) => (
                  <label
                    key={amount}
                    className="flex cursor-pointer items-center gap-2 rounded border border-hc-yellow/40 px-4 py-2 text-hc-text transition has-[:checked]:border-hc-yellow has-[:checked]:bg-hc-yellow has-[:checked]:text-black"
                  >
                    <input
                      type="radio"
                      name="preset-amount"
                      value={amount}
                      defaultChecked={amount === 30}
                      className="sr-only"
                    />
                    {amount} EUR
                  </label>
                ))}
                <label className="flex cursor-pointer items-center gap-2 rounded border border-hc-yellow/40 px-4 py-2 text-hc-text transition has-[:checked]:border-hc-yellow has-[:checked]:bg-hc-yellow has-[:checked]:text-black">
                  <input
                    type="radio"
                    name="preset-amount"
                    value="other"
                    className="sr-only"
                  />
                  Otro
                </label>
              </div>
            </fieldset>

            <div className="mb-6">
              <label htmlFor="custom-amount" className="mb-2 block text-sm font-semibold text-hc-text">
                Importe personalizado (EUR)
              </label>
              <div className="flex overflow-hidden rounded border border-white/20 bg-black/40 focus-within:border-hc-yellow">
                <span className="flex items-center bg-white/10 px-3 text-hc-muted">EUR</span>
                <input
                  id="custom-amount"
                  type="number"
                  min="1"
                  placeholder="50"
                  aria-label="Importe de donación en euros"
                  className="flex-1 bg-transparent px-3 py-2 text-hc-text placeholder-hc-muted focus:outline-none"
                />
              </div>
            </div>
          </form>

          <div className="text-center">
            <Button href={routes.donate} size="lg" className="w-full sm:w-auto">
              Ir a pasarela de pago
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
