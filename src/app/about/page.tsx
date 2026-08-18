import type { Metadata } from "next";

import { AboutPageContent } from "@/features/about";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Manifiesto, valores y equipo de la asociación Hablemos Claro. Defendemos la libertad de expresión y el pensamiento crítico."
};

export default function AboutPage() {
  return <AboutPageContent />;
}
