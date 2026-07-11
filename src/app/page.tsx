import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoPreviewSection } from "@/components/sections/ManifestoPreviewSection";
import { VolunteerSection } from "@/components/sections/VolunteerSection";
import { DonationSection } from "@/components/sections/DonationSection";

export const metadata: Metadata = {
  title: "Hablemos Claro | Inicio",
  description:
    "Asociación cívica española que desarrolla el pensamiento crítico y defiende la libertad de expresión. Únete a nuestro espacio de debate."
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoPreviewSection />
      <VolunteerSection />
      <DonationSection />
    </>
  );
}
