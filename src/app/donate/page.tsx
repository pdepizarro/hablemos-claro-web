import type { Metadata } from "next";

import { DonatePageContent } from "@/features/donations";

export const metadata: Metadata = {
  title: "Compra libertad",
  description:
    "Apoya a la asociación Hablemos Claro con tu aportación económica y ayuda a sostener nuestras actividades en toda España."
};

export default function DonatePage() {
  return <DonatePageContent />;
}
