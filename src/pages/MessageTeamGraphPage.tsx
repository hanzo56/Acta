import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import { ActaHeaderLogo } from "../components/ActaHeaderLogo";
import { AppBottomNav } from "../components/AppBottomNav";
import {
  ICON_BELL as imgBell,
  ICON_CHECK as imgCheck,
  ICON_ELLIPSIS as imgEllipsis,
  ICON_CHAT as imgChat,
  ICON_MAIL as imgMail,
  ICON_MESSAGES as imgMessages,
  ICON_SLACK as imgSlack,
} from "../assets/actaIconUrls";
import { useScenarioGraphRun } from "../hooks/useScenarioGraphRun";
import type { ScenarioStepStatus } from "../scenarioGraphStorage";
import { readMessageTeamScenario } from "../scenarioSession";

const STEP_LOAD_MS = 2800;

const DEFAULTS = {
  channel: "#team channel",
  topic: "Weekly update",
  tone: "Professional",
  attachment: "None",
} as const;

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

function ScenarioStepRow({
  title,
  icon,
  iconClass,
  status,
}: {
  title: string;
  icon: string;
  iconClass: string;
  status: ScenarioStepStatus;
}) {
  const pending = status === "pending";
  const loading = status === "loading";
  const done = status === "done";
  const iconBox = loading ? "bg-[rgba(78,222,163,0.1)]" : "bg-[#1c1b1b]";

  return (
    <li
      className={`flex items-start gap-4 py-1 transition-opacity duration-300 ${
        pending ? "opacity-40" : "opacity-100"
      }`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconBox}`}
      >
        <img alt="" className={`${iconClass} object-contain`} src={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] leading-snug text-[#e5e2e1]">{title}</p>
        {loading ? (
          <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(78,222,163,0.8)]">
            RUNNING
          </p>
        ) : null}
        {pending ? (
          <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(187,202,191,0.7)]">
            QUEUED
          </p>
        ) : null}
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

export function MessageTeamGraphPage() {
  const location = useLocation();
  const fromScenarioPreview =
    (location.state as { fromScenarioPreview?: boolean } | null)
      ?.fromScenarioPreview === true;

  const scenario = useMemo(() => {
    const r = readMessageTeamScenario();
    return r ?? { ...DEFAULTS };
  }, []);

  const steps = useMemo(
    () => [
      {
        title: `Scoped destination: ${scenario.channel}`,
        icon: imgChat,
        iconClass: "size-5",
      },
      {
        title: "Pulled last week’s thread + open decisions for continuity",
        icon: imgSlack,
        iconClass: "size-5",
      },
      {
        title: `Drafted update centered on “${scenario.topic}”`,
        icon: imgMessages,
        iconClass: "size-5",
      },
      {
        title: `Edited for tone: ${scenario.tone}`,
        icon: imgMail,
        iconClass: "h-5 w-[18px]",
      },
      {
        title: `Attachments policy applied: ${scenario.attachment}`,
        icon: imgBell,
        iconClass: "h-[20px] w-5",
      },
    ],
    [scenario],
  );

  const { stepStatuses, showFollowUp, followUpChoice, resolveFollowUp, headerStatus } =
    useScenarioGraphRun({
      id: "message-team",
      stepCount: steps.length,
      stepLoadMs: STEP_LOAD_MS,
      fromScenarioPreview,
    });

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Message team graph">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">
              {headerStatus}
            </p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Team message run
            </h1>
            <p className="pt-1 text-[14px] font-normal leading-5 text-[#bbcabf]">
              Simulated compose + policy checks from your preview answers.
            </p>
          </header>

          <section aria-label="Execution timeline">
            <h2 className="mb-4 px-0.5 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
              Steps
            </h2>
            <ul className="flex flex-col gap-4">
              {steps.map((s, idx) => (
                <ScenarioStepRow
                  key={s.title}
                  title={s.title}
                  icon={s.icon}
                  iconClass={s.iconClass}
                  status={stepStatuses[idx] ?? "pending"}
                />
              ))}
            </ul>
          </section>

          {showFollowUp ? (
            <section
              className="rounded-2xl border border-[rgba(78,222,163,0.25)] bg-[rgba(78,222,163,0.06)] p-6"
              aria-label="Send timing"
            >
              <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                Send immediately, or schedule for tomorrow 9:00am local so EU
                teammates see it first thing?
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => resolveFollowUp("Scheduled · Tomorrow 9:00am")}
                  className="flex-1 rounded-xl bg-[#4edea3] py-3.5 text-[14px] font-bold text-[#00422b] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.15)] transition hover:bg-[#5fe8b3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
                >
                  Schedule 9:00am
                </button>
                <button
                  type="button"
                  onClick={() => resolveFollowUp("Sent immediately (simulated)")}
                  className="flex-1 rounded-xl border border-[rgba(187,202,191,0.35)] py-3.5 text-[14px] font-semibold text-[#bbcabf] transition hover:bg-[rgba(255,255,255,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
                >
                  Send now
                </button>
              </div>
            </section>
          ) : null}

          {followUpChoice != null ? (
            <div className="rounded-xl border border-[rgba(78,222,163,0.35)] bg-[#131313] px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#4edea3]">
                Delivery
              </p>
              <p className="mt-1 text-[14px] leading-5 text-[#bbcabf]">
                {followUpChoice}
              </p>
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
