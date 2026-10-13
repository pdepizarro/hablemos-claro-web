import ical from "node-ical";
import type { VEvent } from "node-ical";

import type { CalendarEvent, CalendarEventsResult, CalendarSource } from "../types";

const TIME_ZONE = "Europe/Madrid";
const REVALIDATE_SECONDS = 600;

const madridFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function madridParts(date: Date): { date: string; time: string } {
  const parts: Record<string, string> = {};
  for (const part of madridFormatter.formatToParts(date)) parts[part.type] = part.value;
  return {
    date: `${parts["year"]}-${parts["month"]}-${parts["day"]}`,
    time: `${parts["hour"]}:${parts["minute"]}`
  };
}

// node-ical crea los eventos de todo el día a medianoche local: se leen sus componentes locales.
function localDateOnly(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function utcDateOnly(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number) as [number, number, number];
  return utcDateOnly(new Date(Date.UTC(y, m - 1, d + days)));
}

function cleanText(value: unknown): string {
  const text = typeof value === "string" ? value : "";
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function buildEvent(
  source: CalendarSource,
  event: VEvent,
  start: Date,
  end: Date | undefined,
  allDay: boolean,
  occurrenceKey: string
): CalendarEvent {
  const base = {
    id: `${source}-${event.uid}-${occurrenceKey}`,
    title: cleanText(event.summary) || "Evento",
    source,
    location: cleanText(event.location),
    description: cleanText(event.description)
  };

  if (allDay) {
    const toDate = event.rrule ? utcDateOnly : localDateOnly;
    const startDate = toDate(start);
    // En iCal el fin de un evento de todo el día es exclusivo.
    const lastDate = end ? addDays(toDate(end), -1) : startDate;
    return {
      ...base,
      startDate,
      endDate: lastDate < startDate ? startDate : lastDate,
      startTime: null,
      endTime: null
    };
  }

  const startParts = madridParts(start);
  const endParts = madridParts(end ?? start);
  return {
    ...base,
    startDate: startParts.date,
    endDate: endParts.date < startParts.date ? startParts.date : endParts.date,
    startTime: startParts.time,
    endTime: endParts.time
  };
}

function expandEvent(source: CalendarSource, event: VEvent, windowStart: Date, windowEnd: Date): CalendarEvent[] {
  const allDay = event.datetype === "date" || Boolean((event.start as { dateOnly?: boolean }).dateOnly);

  if (!event.rrule) {
    return [buildEvent(source, event, event.start, event.end, allDay, "0")];
  }

  const duration = event.end ? event.end.getTime() - event.start.getTime() : 0;
  const exdates = new Set(
    Object.values(event.exdate ?? {}).map((d) => (d instanceof Date ? d.toISOString().slice(0, 10) : ""))
  );

  return event.rrule
    .between(windowStart, windowEnd, true)
    .filter((occurrence) => !exdates.has(occurrence.toISOString().slice(0, 10)))
    .map((occurrence) =>
      buildEvent(
        source,
        event,
        occurrence,
        event.end ? new Date(occurrence.getTime() + duration) : undefined,
        allDay,
        occurrence.toISOString()
      )
    );
}

async function loadCalendar(calendarId: string, source: CalendarSource): Promise<CalendarEvent[]> {
  const url = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!response.ok) throw new Error(`Calendar ${source} responded ${response.status}`);

  const parsed = ical.sync.parseICS(await response.text());
  const now = Date.now();
  const windowStart = new Date(now - 366 * 24 * 60 * 60 * 1000);
  const windowEnd = new Date(now + 2 * 366 * 24 * 60 * 60 * 1000);

  const events: CalendarEvent[] = [];
  for (const item of Object.values(parsed)) {
    if (item?.type === "VEVENT" && item.start) {
      events.push(...expandEvent(source, item as VEvent, windowStart, windowEnd));
    }
  }
  return events;
}

export async function getCalendarEvents(
  calendars: { id: string; source: CalendarSource }[]
): Promise<CalendarEventsResult> {
  const results = await Promise.allSettled(calendars.map((c) => loadCalendar(c.id, c.source)));

  const events: CalendarEvent[] = [];
  let hasError = false;
  for (const result of results) {
    if (result.status === "fulfilled") events.push(...result.value);
    else hasError = true;
  }

  events.sort((a, b) =>
    `${a.startDate} ${a.startTime ?? "00:00"}`.localeCompare(`${b.startDate} ${b.startTime ?? "00:00"}`)
  );
  return { events, hasError };
}
