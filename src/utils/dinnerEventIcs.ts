/** RFC 5545-ish iCalendar text for “Dinner with Sarah” (floating local time for import). */

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function formatIcsUtcStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/** Same calendar date as `reservationDateLabel()` in GraphPage: April 21, 2026, 7–9 PM local when imported. */
export function downloadDinnerWithSarahIcs(): void {
  if (typeof window === "undefined") return;

  const uid = `${Date.now()}-acta-dinner@acta.local`;
  const dtStamp = formatIcsUtcStamp(new Date());
  const summary = escapeIcs("Dinner with Sarah");
  const location = escapeIcs("Tori Tori Shabu N Sushi, Arcadia, CA 91007");
  const description = escapeIcs(
    "Invitee: Sarah Jenkins. Dinner reservation orchestrated in Acta.",
  );

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Acta//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    "DTSTART:20260421T190000",
    "DTEND:20260421T210000",
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dinner-with-sarah.ics";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
