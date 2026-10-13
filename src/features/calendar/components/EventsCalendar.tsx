"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";

import type { CalendarEvent, CalendarSource } from "../types";

type EventsCalendarProps = {
  events: CalendarEvent[];
  /** Fecha de hoy (YYYY-MM-DD, Europe/Madrid) calculada en el servidor. */
  todayIso: string;
  hasError: boolean;
};

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MAX_CHIPS = 3;

const chipStyles: Record<CalendarSource, string> = {
  hablemos: "bg-hc-yellow text-black",
  manifestaciones: "bg-hc-red text-white"
};

const dotStyles: Record<CalendarSource, string> = {
  hablemos: "bg-hc-yellow",
  manifestaciones: "bg-hc-red"
};

const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric", timeZone: "UTC" });
const madridDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Madrid",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toIso(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function fromIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  return new Date(Date.UTC(y, m - 1, d));
}

function addDays(iso: string, days: number): string {
  const date = fromIso(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return toIso(date);
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function compareInDay(a: CalendarEvent, b: CalendarEvent): number {
  return (a.startTime ?? "").localeCompare(b.startTime ?? "") || a.title.localeCompare(b.title);
}

function formatEventDate(iso: string): string {
  return capitalize(
    new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(fromIso(iso))
  );
}

export function EventsCalendar({ events, todayIso, hasError }: EventsCalendarProps) {
  const [today, setToday] = useState(todayIso);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [{ year, month }, setView] = useState(() => {
    const [y, m] = todayIso.split("-").map(Number) as [number, number];
    return { year: y, month: m - 1 };
  });

  // El servidor puede haber generado la página hace minutos: se recalcula "hoy" en el cliente.
  useEffect(() => {
    setToday(madridDayFormatter.format(new Date()));
  }, []);

  useEffect(() => {
    if (selectedEvents.length === 0) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEvents([]);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedEvents]);

  const monthStart = toIso(new Date(Date.UTC(year, month, 1)));
  const monthEnd = toIso(new Date(Date.UTC(year, month + 1, 0)));
  const daysInMonth = Number(monthEnd.slice(8));

  const cells = useMemo(() => {
    const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
    const total = Math.ceil((offset + daysInMonth) / 7) * 7;
    const gridStart = addDays(monthStart, -offset);
    return Array.from({ length: total }, (_, i) => addDays(gridStart, i));
  }, [year, month, daysInMonth, monthStart]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    const first = cells[0] ?? monthStart;
    const last = cells[cells.length - 1] ?? monthEnd;
    for (const event of events) {
      if (event.endDate < first || event.startDate > last) continue;
      let day = event.startDate < first ? first : event.startDate;
      const until = event.endDate > last ? last : event.endDate;
      while (day <= until) {
        const list = map.get(day) ?? [];
        list.push(event);
        map.set(day, list);
        day = addDays(day, 1);
      }
    }
    for (const list of map.values()) list.sort(compareInDay);
    return map;
  }, [events, cells, monthStart, monthEnd]);

  const monthLabel = capitalize(monthFormatter.format(new Date(Date.UTC(year, month, 1))));

  function shiftMonth(delta: number) {
    const date = new Date(Date.UTC(year, month + delta, 1));
    setView({ year: date.getUTCFullYear(), month: date.getUTCMonth() });
  }

  function goToToday() {
    const [y, m] = today.split("-").map(Number) as [number, number];
    setView({ year: y, month: m - 1 });
  }

  const navButton =
    "inline-flex h-10 items-center justify-center rounded border border-black/15 bg-white px-3 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow";

  return (
    <div className="bg-white text-black">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 p-3 sm:p-4">
        <h2 className="font-heading text-xl font-bold sm:text-2xl" aria-live="polite">
          {monthLabel}
        </h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => shiftMonth(-1)} className={navButton} aria-label="Mes anterior">
            ‹
          </button>
          <button type="button" onClick={goToToday} className={navButton}>
            Hoy
          </button>
          <button type="button" onClick={() => shiftMonth(1)} className={navButton} aria-label="Mes siguiente">
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-black/10 bg-black/[0.03] text-center text-xs font-semibold uppercase tracking-wider text-black/60">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((iso) => {
          const dayEvents = eventsByDay.get(iso) ?? [];
          const inMonth = iso >= monthStart && iso <= monthEnd;
          const isToday = iso === today;
          const isExpanded = expandedDay === iso;
          const visible = isExpanded ? dayEvents : dayEvents.slice(0, MAX_CHIPS);
          const hidden = dayEvents.length - visible.length;

          return (
            <div
              key={iso}
              className={[
                "min-h-[3.75rem] min-w-0 border-b border-r border-black/10 p-1 sm:min-h-[7rem] sm:p-1.5",
                inMonth ? "bg-white" : "bg-black/[0.04] text-black/40"
              ].join(" ")}
            >
              <div className="flex justify-center sm:justify-start">
                {dayEvents.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelectedEvents(dayEvents)}
                    aria-label={`Ver ${dayEvents.length} ${
                      dayEvents.length === 1 ? "evento" : "eventos"
                    } del ${formatEventDate(iso)}`}
                    className={[
                      "flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold sm:h-7 sm:min-w-7 sm:text-sm",
                      isToday ? "bg-black text-white" : "hover:bg-black/10",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
                    ].join(" ")}
                  >
                    {Number(iso.slice(8))}
                  </button>
                ) : (
                  <span
                    className={[
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:h-7 sm:w-7 sm:text-sm",
                      isToday ? "bg-black text-white" : ""
                    ].join(" ")}
                  >
                    {Number(iso.slice(8))}
                  </span>
                )}
              </div>

              {dayEvents.length > 0 && (
                <>
                  <span className="sr-only">
                    {dayEvents.length} {dayEvents.length === 1 ? "evento" : "eventos"}
                  </span>

                  <div className="mt-1 hidden flex-col gap-1 sm:flex">
                    {visible.map((event) => (
                      <button
                        type="button"
                        key={`${event.id}-${iso}`}
                        onClick={() => setSelectedEvents([event])}
                        aria-label={`Ver detalles: ${event.title}`}
                        className={`line-clamp-2 break-words rounded px-1.5 py-0.5 text-left text-xs font-semibold leading-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black ${chipStyles[event.source]}`}
                      >
                        {event.startTime && iso === event.startDate ? `${event.startTime} ` : ""}
                        {event.title}
                      </button>
                    ))}
                    {hidden > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedDay(iso)}
                        className="px-1 text-left text-xs font-semibold text-black/60 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
                        aria-label={`Mostrar ${hidden} eventos más`}
                      >
                        +{hidden} más
                      </button>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap justify-center gap-1 sm:hidden">
                    {dayEvents.map((event) => (
                      <button
                        type="button"
                        key={`${event.id}-${iso}`}
                        onClick={() => setSelectedEvents([event])}
                        aria-label={`Ver detalles: ${event.title}`}
                        title={event.title}
                        className={`h-2.5 w-2.5 rounded-full ${dotStyles[event.source]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {hasError && (
        <p className="m-3 rounded border border-hc-red/40 bg-hc-red/10 px-3 py-2 text-sm text-hc-red sm:m-4">
          No hemos podido cargar todos los calendarios. Inténtalo de nuevo en unos minutos.
        </p>
      )}

      {selectedEvents.length > 0 && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4"
              onClick={() => setSelectedEvents([])}
            >
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="calendar-events-title"
                className="relative my-auto max-h-[min(90vh,48rem)] w-full max-w-xl overflow-y-auto rounded-hc-lg border border-hc-yellow/30 bg-[#0a0a0a] p-5 text-hc-text shadow-hc-card sm:p-7"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedEvents([])}
                  className="absolute right-3 top-3 rounded px-2 py-1 text-hc-muted transition-colors hover:text-hc-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
                  aria-label="Cerrar detalles de eventos"
                >
                  ✕
                </button>

                <h3
                  id="calendar-events-title"
                  className="mt-4 pr-8 font-heading text-2xl font-bold text-hc-yellow sm:text-3xl"
                >
                  {selectedEvents.length === 1 ? "Detalle del evento" : "Eventos del día"}
                </h3>

                <div className="mt-5 space-y-5">
                  {selectedEvents.map((selectedEvent) => (
                    <article
                      key={selectedEvent.id}
                      className="rounded-hc-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                    >
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${chipStyles[selectedEvent.source]}`}
                      >
                        {selectedEvent.source === "hablemos" ? "Hablemos Claro" : "Manifestación"}
                      </span>
                      <h4 className="mt-3 font-heading text-xl font-bold text-hc-text">
                        {selectedEvent.title}
                      </h4>

                      <dl className="mt-4 space-y-3 text-sm sm:text-base">
                        <div>
                          <dt className="font-semibold text-hc-text">Fecha</dt>
                          <dd className="mt-1 text-hc-muted">
                            {formatEventDate(selectedEvent.startDate)}
                            {selectedEvent.endDate !== selectedEvent.startDate &&
                              ` – ${formatEventDate(selectedEvent.endDate)}`}
                          </dd>
                        </div>
                        {selectedEvent.startTime && (
                          <div>
                            <dt className="font-semibold text-hc-text">Hora</dt>
                            <dd className="mt-1 text-hc-muted">
                              {selectedEvent.startTime}
                              {selectedEvent.endTime ? ` – ${selectedEvent.endTime}` : ""}
                            </dd>
                          </div>
                        )}
                        {selectedEvent.location && (
                          <div>
                            <dt className="font-semibold text-hc-text">Lugar</dt>
                            <dd className="mt-1">
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  selectedEvent.location
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whitespace-pre-wrap text-hc-yellow underline decoration-hc-yellow/50 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hc-yellow"
                              >
                                {selectedEvent.location}
                              </a>
                            </dd>
                          </div>
                        )}
                        {selectedEvent.description && (
                          <div>
                            <dt className="font-semibold text-hc-text">Descripción</dt>
                            <dd className="mt-1 whitespace-pre-wrap text-hc-muted">
                              {selectedEvent.description}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
