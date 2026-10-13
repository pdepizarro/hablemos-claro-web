import { Highlight, Section, SectionTitle } from "@/shared/ui";
import { getCalendarEvents } from "../lib/calendar-events";
import { CalendarSubscribeButton } from "./CalendarSubscribeButton";
import { EmailNotificationHelpDialog } from "./EmailNotificationHelpDialog";
import { EventsCalendar } from "./EventsCalendar";

const manifestacionesCalendarId =
  process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_ID"] ?? "asociacionhablemosclaro@gmail.com";
const manifestacionesCalendarCid =
  process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_CID"] ??
  "YXNvY2lhY2lvbmhhYmxlbW9zY2xhcm9AZ21haWwuY29t";

const hablemosClaroCalendarId =
  process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_2_ID"] ??
  "e1f6e58ae5904699245611a177b9d20b3fbe90b2fcaeca5bb9719efbb8da3bc6@group.calendar.google.com";
const hablemosClaroCalendarCid =
  process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_2_CID"] ??
  "ZTFmNmU1OGFlNTkwNDY5OTI0NTYxMWExNzdiOWQyMGIzZmJlOTBiMmZjYWVjYTViYjk3MTllZmJiOGRhM2JjNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";

const madridDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Madrid",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

export async function CalendarPageContent() {
  const { events, hasError } = await getCalendarEvents([
    { id: manifestacionesCalendarId, source: "manifestaciones" },
    { id: hablemosClaroCalendarId, source: "hablemos" }
  ]);
  const todayIso = madridDayFormatter.format(new Date());

  return (
    <Section>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <SectionTitle as="h1">
              <Highlight>Calendario</Highlight>
            </SectionTitle>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-hc-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-hc-red" aria-hidden />
              Manifestaciones
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-hc-yellow" aria-hidden />
              Eventos de Hablemos Claro
            </span>
          </div>

          <div className="overflow-hidden rounded-hc-lg border border-hc-yellow/30 bg-white shadow-hc-card">
            <EventsCalendar events={events} todayIso={todayIso} hasError={hasError} />
          </div>

          <div className="rounded-hc-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <CalendarSubscribeButton
                cid={manifestacionesCalendarCid}
                label="Añadir calendario de manifestaciones"
              />
              <CalendarSubscribeButton
                cid={hablemosClaroCalendarCid}
                label="Añadir calendario de Hablemos Claro"
              />
            </div>
            <div className="mt-3 flex justify-center">
              <EmailNotificationHelpDialog associationName="Hablemos Claro" />
            </div>

            <p className="mt-4 text-sm text-hc-muted">
              Te suscribirás con permisos de <strong className="text-hc-text">solo lectura</strong>:
              podrás ver todos los eventos, pero no editarlos ni crear nuevos.
            </p>

            <p className="mt-2 text-sm text-hc-muted">
              Los próximos eventos se actualizarán automáticamente en tu Google Calendar. Las
              notificaciones por correo dependen de tu configuración personal en Google Calendar.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
