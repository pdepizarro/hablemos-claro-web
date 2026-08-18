import type { Metadata } from "next";

import { HomePageContent } from "@/features/home";

export const metadata: Metadata = {
  title: "Hablemos Claro | Inicio",
  description:
    "Asociación cívica española que desarrolla el pensamiento crítico y defiende la libertad de expresión. Únete a nuestro espacio de debate."
};

export default function HomePage() {
  return <HomePageContent />;
}
