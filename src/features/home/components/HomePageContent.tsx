import { DonationSection } from "./DonationSection";
import { HeroSection } from "./HeroSection";
import { ManifestoPreviewSection } from "./ManifestoPreviewSection";
import { VolunteerSection } from "./VolunteerSection";

export function HomePageContent() {
  return (
    <>
      <HeroSection />
      <ManifestoPreviewSection />
      <VolunteerSection />
      <DonationSection />
    </>
  );
}
