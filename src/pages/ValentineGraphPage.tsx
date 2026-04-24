import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ActaHeaderLogo } from "../components/ActaHeaderLogo";
import { AppBottomNav } from "../components/AppBottomNav";
import {
  ICON_BELL as imgBell,
  ICON_CALENDAR as imgCalendar,
  ICON_CHECK as imgCheck,
  ICON_ELLIPSIS as imgEllipsis,
  ICON_FORK_KNIFE as imgFork,
  ICON_MESSAGES as imgMessages,
} from "../assets/actaIconUrls";
import {
  clearValentineFlowComplete,
  readValentineFlowComplete,
  readValentineSequenceStart,
  readValentineStepTimes,
  writeValentineFlowComplete,
  writeValentineSequenceStart,
  writeValentineStepTimes,
} from "../valentineGraphStorage";

const STEP_LOAD_MS = 3_500;

type StepStatus = "pending" | "loading" | "done";

type StepConfig = {
  title: string;
  icon: string;
  iconSize: "size-5" | "h-5 w-[18px]" | "h-5 w-[15px]" | "h-[20px] w-5";
  loadDurationMs?: number;
  doneMessage?: string;
};

const STEPS: StepConfig[] = [
  {
    title:
      "Indexed 18 months of messages for gifts, music, and trip mentions tied to Sarah",
    icon: imgMessages,
    iconSize: "size-5",
  },
  {
    title:
      "Cross-referenced The Aurora with tour dates in your anniversary month (Feb)",
    icon: imgCalendar,
    iconSize: "h-5 w-[18px]",
  },
  {
    title: "Polled Eugene, Katya, and Noah for timing, budget, and surprise level",
    icon: imgMessages,
    iconSize: "size-5",
    loadDurationMs: STEP_LOAD_MS * 2,
    doneMessage: "Circle aligned",
  },
  {
    title: "Booked in-home private chef (Sat Feb 7 · 7pm · 4 courses)",
    icon: imgFork,
    iconSize: "h-5 w-[15px]",
  },
  {
    title: "Purchased 2 tickets — The Aurora, Feb 14, section B",
    icon: imgCalendar,
    iconSize: "h-5 w-[18px]",
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
];

function formatStepCompletedTime(ms: number) {
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
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

function initialStepCompletedAt(
  fromPreviewApprove: boolean,
): (number | null)[] {
  if (fromPreviewApprove) {
    return Array.from({ length: STEPS.length }, () => null);
  }
  if (readValentineFlowComplete()) {
    const stored = readValentineStepTimes(STEPS.length);
    if (stored) {
      return [...stored];
    }
    const now = Date.now();
    return STEPS.map((_, i) => now - (STEPS.length - 1 - i) * 2500);
  }
  const seqStart = readValentineSequenceStart();
  if (seqStart != null) {
    return computeStateFromElapsed(seqStart, Date.now()).stepCompletedAt;
  }
  return Array.from({ length: STEPS.length }, () => null);
}

function initialStepStatuses(fromPreviewApprove: boolean): StepStatus[] {
  if (fromPreviewApprove) {
    clearValentineFlowComplete();
    writeValentineSequenceStart(Date.now());
    return Array.from({ length: STEPS.length }, (_, i) =>
      i === 0 ? "loading" : "pending",
    );
  }
  if (readValentineFlowComplete()) {
    return STEPS.map(() => "done");
  }
  const seqStart = readValentineSequenceStart();
  if (seqStart != null) {
    return computeStateFromElapsed(seqStart, Date.now()).stepStatuses;
  }
  return Array.from({ length: STEPS.length }, (_, i) =>
    i === 0 ? "loading" : "pending",
  );
}

export function ValentineGraphPage() {
  const location = useLocation();
  const fromPreviewApprove =
    (location.state as { fromPreviewApprove?: boolean } | null)
      ?.fromPreviewApprove === true;

  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(() =>
    initialStepStatuses(fromPreviewApprove),
  );
  const [stepCompletedAt, setStepCompletedAt] = useState<(number | null)[]>(
    () => initialStepCompletedAt(fromPreviewApprove),
  );

  const [, setClockTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setClockTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (readValentineFlowComplete()) return;

    let sequenceStart = readValentineSequenceStart();
    if (sequenceStart == null) {
      sequenceStart = Date.now();
      writeValentineSequenceStart(sequenceStart);
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const advanceFrom = (index: number) => {
      if (index >= STEPS.length) return;
      const endMs = stepCompletionTime(sequenceStart!, index);
      const remaining = Math.max(0, endMs - Date.now());
      timeouts.push(
        setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev] as StepStatus[];
            next[index] = "done";
            if (index + 1 < STEPS.length) {
              next[index + 1] = "loading";
            }
            return next;
          });
          setStepCompletedAt((prev) => {
            const next = [...prev];
            next[index] = endMs;
            return next;
          });
          advanceFrom(index + 1);
        }, remaining),
      );
    };

    const loadingIdx = stepStatuses.findIndex((s) => s === "loading");
    if (loadingIdx !== -1) {
      advanceFrom(loadingIdx);
    } else if (!stepStatuses.every((s) => s === "done")) {
      advanceFrom(0);
    }

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!stepStatuses.length || !stepStatuses.every((s) => s === "done"))
      return;
    writeValentineFlowComplete();
    if (stepCompletedAt.every((t): t is number => t != null)) {
      writeValentineStepTimes(stepCompletedAt);
    }
  }, [stepStatuses, stepCompletedAt]);

  const allDone = stepStatuses.every((s) => s === "done");

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
                <GraphValentineRow
                  key={step.title}
                  title={step.title}
                  icon={step.icon}
                  iconSizeClass={step.iconSize}
                  status={stepStatuses[i] ?? "pending"}
                  doneSubtitle={doneSubtitle}
                />
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
                  Sat Feb 7
                  <span className="text-[#bbcabf]"> — </span>
                  private chef
                </p>
                <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                  Wed Feb 12
                  <span className="text-[#bbcabf]"> — </span>
                  custom song delivered
                </p>
                <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                  Fri Feb 14
                  <span className="text-[#bbcabf]"> — </span>
                  The Aurora, evening reveal to Sarah
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
}: {
  title: string;
  icon: string;
  iconSizeClass: string;
  status: StepStatus;
  doneSubtitle: string;
}) {
  const pending = status === "pending";
  const loading = status === "loading";
  const done = status === "done";

  const iconBoxClass = loading ? "bg-[rgba(78,222,163,0.1)]" : "bg-[#1c1b1b]";

  return (
    <li
      className={`flex items-start gap-4 py-1 transition-opacity duration-300 ${
        pending ? "opacity-40" : "opacity-100"
      }`}
    >
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
      </div>
      <div className="flex size-[20px] shrink-0 items-center justify-center pt-0.5">
        {done && <img alt="" className="size-[16.67px]" src={imgCheck} />}
        {loading && <GraphStepLoader />}
        {pending && (
          <img alt="" className="size-[16.67px] opacity-70" src={imgEllipsis} />
        )}
      </div>
    </li>
  );
}
