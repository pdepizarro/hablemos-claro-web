import { Mail } from "lucide-react";

import { contactEmail } from "@/content/social-links";
import { Section } from "@/shared/ui";

import { ContactForm } from "./ContactForm";

export function ContactPageContent() {
  return (
    <Section>
      <div className="container">
        <h1 className="mb-12 font-heading text-4xl font-bold text-hc-text sm:text-5xl">
          Escríbenos
        </h1>

        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <ContactForm />
          </div>

          <aside className="lg:w-64" aria-label="Información de contacto">
            <div className="flex items-start gap-3">
              <Mail size={20} className="mt-1 shrink-0 text-hc-yellow" aria-hidden="true" />
              <div>
                <p className="font-semibold text-hc-text">Correo electrónico</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="break-all text-hc-muted transition-colors hover:text-hc-yellow"
                >
                  {contactEmail}
                </a>
                <p className="mt-2 text-sm text-hc-muted">Respondemos todas las consultas.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
