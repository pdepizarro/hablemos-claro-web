import type { Metadata } from "next";

import { CalendarPageContent } from "@/features/calendar";

export const metadata: Metadata = {
  title: "Calendario",
  description:
    "Agenda pública de actividades y eventos de la asociación Hablemos Claro. Suscríbete en modo solo lectura para recibir actualizaciones automáticas."
};

export default function CalendarPage() {
  return <CalendarPageContent />;
}

