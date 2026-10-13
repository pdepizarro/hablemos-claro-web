"use client";

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

export function EventsCalendar({ events, todayIso, hasError }: EventsCalendarProps) {
  const [today, setToday] = useState(todayIso);
  const [{ year, month }, setView] = useState(() => {
    const [y, m] = todayIso.split("-").map(Number) as [number, number];
    return { year: y, month: m - 1 };
  });

  // El servidor puede haber generado la página hace minutos: se recalcula "hoy" en el cliente.
  useEffect(() => {
    setToday(madridDayFormatter.format(new Date()));
  }, []);

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
          const visible = dayEvents.slice(0, MAX_CHIPS);
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
                <span
                  className={[
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:h-7 sm:w-7 sm:text-sm",
                    isToday ? "bg-black text-white" : ""
                  ].join(" ")}
                >
                  {Number(iso.slice(8))}
                </span>
              </div>

              {dayEvents.length > 0 && (
                <>
                  <span className="sr-only">
                    {dayEvents.length} {dayEvents.length === 1 ? "evento" : "eventos"}
                  </span>

                  <div className="mt-1 hidden flex-col gap-1 sm:flex">
                    {visible.map((event) => (
                      <div
                        key={`${event.id}-${iso}`}
                        title={`${event.title}${event.location ? ` — ${event.location}` : ""}`}
                        className={`line-clamp-2 break-words rounded px-1.5 py-0.5 text-xs font-semibold leading-tight ${chipStyles[event.source]}`}
                      >
                        {event.startTime && iso === event.startDate ? `${event.startTime} ` : ""}
                        {event.title}
                      </div>
                    ))}
                    {hidden > 0 && <span className="px-1 text-xs font-semibold text-black/60">+{hidden} más</span>}
                  </div>

                  <div className="mt-1 flex flex-wrap justify-center gap-0.5 sm:hidden" aria-hidden>
                    {dayEvents.map((event) => (
                      <span key={`${event.id}-${iso}`} className={`h-2 w-2 rounded-full ${dotStyles[event.source]}`} />
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
    </div>
  );
}
