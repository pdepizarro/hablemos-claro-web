import type { Metadata } from "next";
import Link from "next/link";

import { routes } from "@/shared/config";
import { Highlight, Section, SectionTitle } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Pago cancelado",
  description: "Has cancelado el proceso de donación."
};

export default function DonateCanceledPage() {
  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-hc-lg border border-hc-red/30 bg-white/5 p-6 text-center shadow-hc-card sm:p-10">
          <SectionTitle as="h1">
            <Highlight>Proceso cancelado</Highlight>
          </SectionTitle>
          <p className="mt-4 text-hc-muted sm:text-lg">
            No se ha realizado ningún cargo. Si quieres, puedes volver a la pantalla de donaciones
            y completar el proceso.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={routes.donate}
              className="inline-flex rounded bg-hc-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-[#FFD54A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Volver a donar
            </Link>
            <Link
              href={routes.home}
              className="inline-flex rounded border border-hc-yellow/45 bg-white/5 px-6 py-3 font-semibold text-hc-text transition-colors hover:border-hc-yellow hover:bg-hc-yellow/15 hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
