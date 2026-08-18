import type { Metadata } from "next";

import { ContactPageContent } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos, hazte voluntario o pide más información sobre la asociación Hablemos Claro."
};

export default function ContactPage() {
  return <ContactPageContent />;
}
