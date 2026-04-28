import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { ActaHeaderLogo } from "../components/ActaHeaderLogo";
import { AppBottomNav } from "../components/AppBottomNav";
import {
  ICON_BELL as imgBell,
  ICON_CALENDAR as imgCalendar,
  ICON_CHECK as imgCheck,
  ICON_ELLIPSIS as imgEllipsis,
  ICON_FORK_KNIFE as imgFork,
  ICON_MAP as imgMap,
  ICON_MESSAGES as imgMessages,
} from "../assets/actaIconUrls";
import {
  clearValentineFlowComplete,
  readValentineFlowComplete,
  readValentineSequenceStart,
  readValentineStepTimes,
  writeValentineCompletedStepTitles,
  writeValentineFlowComplete,
  writeValentineSequenceStart,
  writeValentineStepTimes,
} from "../valentineGraphStorage";
import { writeLastCompletedGraphNav } from "../graphNavPath";

const STEP_LOAD_MS = 15_000;

type StepStatus = "pending" | "loading" | "done";

type ValentineIcsDownload = {
  filename: string;
  /** Calendar subject (SUMMARY). */
  summary: string;
  /** Body shown in calendar apps (DESCRIPTION). */
  description: string;
  location?: string;
  start: Date;
  end: Date;
};

type StepConfig = {
  title: string;
  icon: string;
  iconSize: "size-5" | "h-5 w-[18px]" | "h-5 w-[15px]" | "h-[20px] w-5";
  loadDurationMs?: number;
  doneMessage?: string;
  /** When set, a done step shows a button to download an .ics for Apple/Google/Outlook. */
  icsDownload?: ValentineIcsDownload;
};

const FRIEND_POLL_INDEX = 0;

/** Simulated iMessage-style replies from the private poll (congrats + gift nudges). */
const FRIEND_CONGRATS_AND_SUGGESTIONS: {
  from: string;
  congrats: string;
  suggestion: string;
}[] = [
  {
    from: "Eugene",
    congrats: "Ahhh congrats you two — the Aurora angle is *chef’s kiss*.",
    suggestion: "If you want a paper gift: a small Moleskine of Big Sur film shots from 2022. She teased that trip for years.",
  },
  {
    from: "Katya",
    congrats: "I’m beaming. Sarah’s going to lose it in the best way.",
    suggestion: "She once said she’d love proper bookshelf speakers (nothing huge). If budget flexes, that + your playlist = instant win.",
  },
  {
    from: "Noah",
    congrats: "YOOO this is the one. Circle approved. 🙌",
    suggestion: "Low-key: a really good bottle she name-dropped once + zero wrapping drama. I’ll hold the day-of alibi if you need it.",
  },
  {
    from: "Kyson",
    congrats: "This is… actually perfect. I’m in your corner 100%.",
    suggestion: "If you want a quiet flex: a printed playlist QR that opens a private Spotify list you built from her last-shares. Feels personal without clutter.",
  },
  {
    from: "Larry",
    congrats: "Okay this is big. You’re really doing it right.",
    suggestion: "If you want one more beat: a short letter in your own handwriting (even two paragraphs) — she keeps those. Pair it with whatever the night’s big reveal is.",
  },
  {
    from: "Eugene",
    congrats: "Also — one more: send her a dumb meme the morning of so she doesn’t get suspicious. Classic.",
    suggestion: "For the actual gift pile: a framed ticket stub if you can grab one; she saves ephemera.",
  },
];

/** Acta: synthesized “from your thread” ideas (simulated RAG / highlights). */
const ACTA_GIFT_PICKS_FROM_THREAD: { idea: string; simSnippet: string }[] = [
  {
    idea: "Scent upgrade at home: nice candle + matches",
    simSnippet: "“Can we not smell like the office at home?” (Jan, late-night vent thread)",
  },
  {
    idea: "Vinyl of the artist she said she’d ‘frame the cover of’",
    simSnippet: "“If you ever see this on wax, buy it before I do” (April, voice memo back-and-forth)",
  },
  {
    idea: "A printed ‘Ojai someday’ one-pager — 4 mentions in 18 months",
    simSnippet: "Recurring: spa day / tiny cabin / ‘no phones’ weekend (scattered, Aug–Dec)",
  },
];

const STEPS: StepConfig[] = [
  {
    title: "Polled Eugene, Katya, Noah, Kyson, and Larry for timing, budget, and surprise level",
    icon: imgMessages,
    iconSize: "size-5",
    doneMessage: "Circle aligned",
  },
  {
    title: "Booked in-home private chef (Sun Feb 14 · 5pm · 4 courses)",
    icon: imgFork,
    iconSize: "h-5 w-[15px]",
  },
  {
    title:
      "Private chef dinner — add to your calendar (Sun Feb 14 · 5:00pm start)",
    icon: imgCalendar,
    iconSize: "h-5 w-[18px]",
    doneMessage: "Ready to import",
    icsDownload: {
      filename: "acta-private-chef-sarah-feb14.ics",
      summary: "Private chef · Valentine dinner for Sarah (4 courses)",
      description: [
        "In-home private chef dinner — Valentine surprise for Sarah.",
        "",
        "• Four courses at home, before The Aurora the same night",
        "• Start: 5:00 PM (Sun Feb 14, 2027) — ends in time for the 8:00 PM show",
        "• Booked through Acta; coordinated with your run sheet",
        "",
        "Same evening as the concert; keep the reveal timing per your run sheet.",
      ].join("\n"),
      location: "Home",
      start: new Date(2027, 1, 14, 17, 0, 0),
      end: new Date(2027, 1, 14, 19, 0, 0),
    },
  },
  {
    title: "Purchased 2 tickets — The Aurora, Feb 14, section B",
    icon: imgCalendar,
    iconSize: "h-5 w-[18px]",
  },
  {
    title:
      "The Aurora concert — add to your calendar (Sun Feb 14 · 8:00–11:00pm)",
    icon: imgCalendar,
    iconSize: "h-5 w-[18px]",
    doneMessage: "Ready to import",
    icsDownload: {
      filename: "acta-the-aurora-sarah-feb14.ics",
      summary: "The Aurora · Valentine concert for Sarah (Sec B)",
      description: [
        "The Aurora — two tickets, Section B. Valentine evening for Sarah.",
        "",
        "• Show window: 8:00 PM – 11:00 PM (Sun Feb 14, 2027)",
        "• Los Angeles area; venue per your Acta map / run sheet",
        "• Vehicle nav to the venue is staged in Acta",
        "",
        "Part of the full surprise: private chef at home earlier same night, custom song Feb 12, 2027, this show + reveal.",
      ].join("\n"),
      location: "Los Angeles, CA",
      start: new Date(2027, 1, 14, 20, 0, 0),
      end: new Date(2027, 1, 14, 23, 0, 0),
    },
  },
  {
    title: "Commissioned custom song (lyrics from your thread) — ready Feb 12",
    icon: imgBell,
    iconSize: "h-[20px] w-5",
  },
  {
    title: "Drafted one-page “evening run sheet” and queued reveal SMS to Sarah",
    icon: imgMessages,
    iconSize: "size-5",
  },
  {
    title:
      "Your vehicle has the venue saved; navigation will run and take you to the concert",
    icon: imgMap,
    iconSize: "h-5 w-[15px]",
  },
];

function formatStepCompletedTime(ms: number) {
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/** RFC 5545 TEXT escaping for SUMMARY / DESCRIPTION / LOCATION. */
function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function formatDateUtcIcs(d: Date): string {
  return d
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z")
    .replace(/[-:]/g, "");
}

function buildValentineIcsEvent(payload: ValentineIcsDownload): string {
  const uid = `acta-${payload.filename.replace(/\.ics$/i, "")}-${payload.start.getTime()}@acta.local`;
  const dtStamp = formatDateUtcIcs(new Date());
  const dtStart = formatDateUtcIcs(payload.start);
  const dtEnd = formatDateUtcIcs(payload.end);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Acta//Valentine//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(payload.summary)}`,
    `DESCRIPTION:${escapeIcsText(payload.description)}`,
  ];
  if (payload.location?.trim()) {
    lines.push(`LOCATION:${escapeIcsText(payload.location.trim())}`);
  }
  lines.push("END:VEVENT", "END:VCALENDAR", "");
  return lines.join("\r\n");
}

function downloadTextFile(filename: string, text: string, mime: string) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function stepCompletionTime(sequenceStart: number, index: number): number {
  let t = sequenceStart;
  for (let i = 0; i <= index; i++) {
    t += STEPS[i].loadDurationMs ?? STEP_LOAD_MS;
  }
  return t;
}

function computeStateFromElapsed(
  sequenceStart: number,
  now: number,
): { stepStatuses: StepStatus[]; stepCompletedAt: (number | null)[] } {
  const stepStatuses: StepStatus[] = STEPS.map(() => "pending");
  const stepCompletedAt: (number | null)[] = Array.from(
    { length: STEPS.length },
    () => null,
  );
  for (let i = 0; i < STEPS.length; i++) {
    const end = stepCompletionTime(sequenceStart, i);
    if (now >= end) {
      stepStatuses[i] = "done";
      stepCompletedAt[i] = end;
    } else {
      stepStatuses[i] = "loading";
      for (let j = i + 1; j < STEPS.length; j++) stepStatuses[j] = "pending";
      return { stepStatuses, stepCompletedAt };
    }
  }
  return { stepStatuses, stepCompletedAt };
}

function buildValentineVisualState(): {
  stepStatuses: StepStatus[];
  stepCompletedAt: (number | null)[];
  allDone: boolean;
} {
  if (readValentineFlowComplete()) {
    const stored = readValentineStepTimes(STEPS.length);
    if (stored) {
      return {
        stepStatuses: STEPS.map(() => "done"),
        stepCompletedAt: stored,
        allDone: true,
      };
    }
    const now = Date.now();
    return {
      stepStatuses: STEPS.map(() => "done"),
      stepCompletedAt: STEPS.map(
        (_, i) => now - (STEPS.length - 1 - i) * STEP_LOAD_MS,
      ),
      allDone: true,
    };
  }
  const seq = readValentineSequenceStart();
  if (seq == null) {
    return {
      stepStatuses: Array.from({ length: STEPS.length }, (_, i) =>
        i === 0 ? "loading" : "pending",
      ),
      stepCompletedAt: Array.from({ length: STEPS.length }, () => null),
      allDone: false,
    };
  }
  const { stepStatuses, stepCompletedAt } = computeStateFromElapsed(
    seq,
    Date.now(),
  );
  const allDone = stepStatuses.every((s) => s === "done");
  return { stepStatuses, stepCompletedAt, allDone };
}

export function ValentineGraphPage() {
  const location = useLocation();
  const fromPreviewApprove =
    (location.state as { fromPreviewApprove?: boolean } | null)
      ?.fromPreviewApprove === true;

  const [tick, setTick] = useState(0);

  useLayoutEffect(() => {
    if (fromPreviewApprove) {
      clearValentineFlowComplete();
      writeValentineSequenceStart(Date.now());
    } else if (!readValentineFlowComplete() && readValentineSequenceStart() == null) {
      writeValentineSequenceStart(Date.now());
    }
    setTick((n) => n + 1);
  }, [fromPreviewApprove, location.key]);

  const bump = useCallback(() => setTick((n) => n + 1), []);

  const { stepStatuses, stepCompletedAt, allDone } = useMemo(
    () => buildValentineVisualState(),
    [tick, location.key],
  );

  useEffect(() => {
    if (readValentineFlowComplete() || allDone) return;
    const id = window.setInterval(() => bump(), 1000);
    return () => clearInterval(id);
  }, [bump, allDone]);

  useEffect(() => {
    if (!allDone) return;
    if (readValentineFlowComplete()) return;
    const { stepCompletedAt: times } = buildValentineVisualState();
    if (!times.length || !times.every((t): t is number => t != null)) return;
    writeValentineFlowComplete();
    writeValentineStepTimes(times);
    writeValentineCompletedStepTitles(STEPS.map((s) => s.title));
    writeLastCompletedGraphNav("valentine", Math.max(...times));
  }, [allDone, tick]);

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Valentine graph flow">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">
              {allDone ? "Complete" : "Running"}
            </p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Valentine surprise for Sarah
            </h1>
            <div className="pt-1">
              <p className="text-[14px] font-normal leading-5 text-[#bbcabf]">
                Orchestrating a jaw-dropping evening from message intelligence,
                friend input, and premium touchpoints.
              </p>
            </div>
          </header>

          <ul className="flex flex-col gap-4">
            {STEPS.map((step, i) => {
              const t = stepCompletedAt[i];
              const doneSubtitle =
                step.doneMessage ??
                (t != null ? formatStepCompletedTime(t) : "");
              return (
                <Fragment key={step.title}>
                  <GraphValentineRow
                    title={step.title}
                    icon={step.icon}
                    iconSizeClass={step.iconSize}
                    status={stepStatuses[i] ?? "pending"}
                    doneSubtitle={doneSubtitle}
                    icsDownload={step.icsDownload}
                  />
                  {i === FRIEND_POLL_INDEX &&
                  (stepStatuses[i] ?? "pending") === "done" ? (
                    <li className="list-none">
                      <div className="ml-0 rounded-2xl border border-[rgba(60,74,66,0.2)] bg-[#171717] p-4 sm:ml-14">
                        <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#4edea3]">
                          Replies to poll (simulated)
                        </p>
                        <ul className="mt-3 space-y-3">
                          {FRIEND_CONGRATS_AND_SUGGESTIONS.map((row, idx) => (
                            <li
                              key={`fr-${idx}`}
                              className="border-b border-[rgba(60,74,66,0.12)] pb-3 last:border-0 last:pb-0"
                            >
                              <p className="text-[12px] font-bold text-[#bbcabf]">
                                {row.from}
                              </p>
                              <p className="text-[14px] leading-snug text-[#e5e2e1]">
                                {row.congrats}
                              </p>
                              <p className="mt-1.5 text-[13px] leading-5 text-[rgba(187,202,191,0.9)]">
                                <span className="text-[#4edea3]">Idea: </span>
                                {row.suggestion}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 border-t border-[rgba(60,74,66,0.15)] pt-4">
                          <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#bbcabf]">
                            Acta · from your messages (simulated)
                          </p>
                          <p className="mt-1.5 text-[12px] leading-4 text-[rgba(187,202,191,0.8)]">
                            We scanned ~18 months of your thread and ranked
                            gift adjacencies. Top picks to combine with
                            dinner + show:
                          </p>
                          <ul className="mt-2 space-y-2">
                            {ACTA_GIFT_PICKS_FROM_THREAD.map((pick) => (
                              <li
                                key={pick.idea}
                                className="text-[13px] leading-5 text-[#e5e2e1]"
                              >
                                <span className="text-[#4edea3]">→ </span>
                                {pick.idea}
                                <span className="mt-0.5 block text-[11px] italic text-[rgba(187,202,191,0.7)]">
                                  {pick.simSnippet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ) : null}
                </Fragment>
              );
            })}
          </ul>

          {allDone ? (
            <div className="overflow-hidden rounded-2xl border border-[rgba(60,74,66,0.15)] bg-[#1c1b1b]">
              <div className="border-b border-[rgba(60,74,66,0.1)] bg-[rgba(78,222,163,0.06)] px-5 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#bbcabf]">
                  Run sheet
                </p>
                <p className="text-[14px] font-medium leading-5 text-[#4edea3]">
                  Ready to execute
                </p>
              </div>
              <div className="space-y-3 px-5 py-5">
                <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                  Wed Feb 12
                  <span className="text-[#bbcabf]"> — </span>
                  custom song delivered
                </p>
                <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                  Sun Feb 14
                  <span className="text-[#bbcabf]"> — </span>
                  private chef (5pm) at home, then The Aurora (8–11pm), evening reveal
                  to Sarah
                </p>
                <p className="pt-1 text-[12px] leading-4 text-[rgba(187,202,191,0.65)]">
                  Plan grounded in the thread: band hint from six months ago,
                  friend sign-off, and a night built to be unforgettable—not
                  just on calendar.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <header className="acta-header-fixed flex h-16 items-center justify-start bg-[#131313] px-6">
        <ActaHeaderLogo />
      </header>

      <AppBottomNav />
    </div>
  );
}

function GraphStepLoader() {
  return (
    <div
      className="graph-step-loader flex items-end justify-center gap-[3px]"
      role="status"
      aria-label="Step in progress"
    >
      <span className="graph-step-loader__bar inline-block" />
      <span className="graph-step-loader__bar inline-block" />
      <span className="graph-step-loader__bar inline-block" />
    </div>
  );
}

function GraphValentineRow({
  title,
  icon,
  iconSizeClass,
  status,
  doneSubtitle,
  icsDownload,
}: {
  title: string;
  icon: string;
  iconSizeClass: string;
  status: StepStatus;
  doneSubtitle: string;
  icsDownload?: ValentineIcsDownload;
}) {
  const pending = status === "pending";
  const loading = status === "loading";
  const done = status === "done";

  const iconBoxClass = loading ? "bg-[rgba(78,222,163,0.1)]" : "bg-[#1c1b1b]";

  return (
    <li
      className={`flex flex-col gap-2 py-1 transition-opacity duration-300 ${
        pending ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconBoxClass}`}
        >
          <img alt="" className={`${iconSizeClass} object-contain`} src={icon} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] leading-snug text-[#e5e2e1]">{title}</p>
          {done && doneSubtitle && (
            <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(187,202,191,0.7)]">
              {doneSubtitle}
            </p>
          )}
          {loading && (
            <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(78,222,163,0.8)]">
              IN PROGRESS...
            </p>
          )}
          {pending && (
            <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(187,202,191,0.7)]">
              QUEUED
            </p>
          )}
          {done && icsDownload ? (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => {
                  const body = buildValentineIcsEvent(icsDownload);
                  downloadTextFile(
                    icsDownload.filename,
                    body,
                    "text/calendar;charset=utf-8",
                  );
                }}
                className="rounded-xl border border-[rgba(78,222,163,0.45)] bg-[rgba(78,222,163,0.12)] px-3 py-2 text-left text-[13px] font-semibold leading-4 text-[#4edea3] transition hover:border-[rgba(78,222,163,0.65)] hover:bg-[rgba(78,222,163,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
              >
                Add to calendar (.ics)
              </button>
              <p className="mt-1.5 max-w-[min(100%,22rem)] text-[11px] leading-4 text-[rgba(187,202,191,0.65)]">
                Downloads an iCalendar file. Open it to import — subject and
                description are filled for you (
                <span className="text-[#bbcabf]">{icsDownload.summary}</span>
                ).
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex size-[20px] shrink-0 items-center justify-center pt-0.5">
          {done && <img alt="" className="size-[16.67px]" src={imgCheck} />}
          {loading && <GraphStepLoader />}
          {pending && (
            <img alt="" className="size-[16.67px] opacity-70" src={imgEllipsis} />
          )}
        </div>
      </div>
    </li>
  );
}
