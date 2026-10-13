export type CalendarSource = "manifestaciones" | "hablemos";

export type CalendarEvent = {
  id: string;
  title: string;
  source: CalendarSource;
  /** Fecha de inicio (YYYY-MM-DD, zona Europe/Madrid). */
  startDate: string;
  /** Fecha de fin, inclusive (YYYY-MM-DD). */
  endDate: string;
  /** Hora de inicio (HH:mm) o null si es un evento de todo el día. */
  startTime: string | null;
  endTime: string | null;
  location: string;
  description: string;
};

export type CalendarEventsResult = {
  events: CalendarEvent[];
  /** true si algún calendario no se pudo cargar. */
  hasError: boolean;
};
