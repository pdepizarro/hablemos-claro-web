import { Section } from "@/shared/ui";

import { ContactForm } from "./ContactForm";

export function ContactPageContent() {
  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <header className="mb-10 text-center sm:mb-12">
            <h1 className="font-heading text-4xl font-bold text-hc-text sm:text-5xl">Escríbenos</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-hc-muted sm:text-lg">
              Si quieres colaborar, proponer iniciativas o trasladar cualquier consulta, estaremos
              encantados de escucharte.
            </p>
          </header>

          <div className="rounded-hc-lg border border-hc-yellow/25 bg-[#0D0D0D] p-5 shadow-hc-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
