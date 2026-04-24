import { useNavigate } from "react-router-dom";

import { ICON_MIC_MINT as imgMic } from "../assets/actaIconUrls";
import { ACTIVATE_MIC_ON_HOME } from "../navigation/activateMicFromNav";

/** Sound-wave bars (idle) — matches HomePage bottom nav */
const bars = [
  { h: "h-6", bg: "bg-[#4edea3]", delayMs: 0, durationMs: 520 },
  { h: "h-10", bg: "bg-[#10b981]", delayMs: 80, durationMs: 580 },
  { h: "h-4", bg: "bg-[#d0bcff]", delayMs: 160, durationMs: 480 },
  { h: "h-12", bg: "bg-[#4edea3]", delayMs: 40, durationMs: 620 },
  { h: "h-8", bg: "bg-[#b090ff]", delayMs: 120, durationMs: 540 },
  { h: "h-[18px]", bg: "bg-[#10b981]", delayMs: 200, durationMs: 500 },
  { h: "h-7", bg: "bg-[#4edea3]", delayMs: 60, durationMs: 560 },
] as const;

/**
 * Center FAB on non-Home screens: same layout as Home mic (idle), navigates to Home and turns mic on.
 */
export function RemoteNavMicCluster() {
  const navigate = useNavigate();

  return (
    <div
      className="acta-nav-mic--idle pointer-events-none absolute left-1/2 top-0 z-50 flex w-[min(100%,220px)] -translate-x-1/2 -translate-y-[42%] flex-col items-center gap-1"
    >
      <div
        className="flex h-8 w-full max-w-[200px] items-end justify-center gap-1"
        aria-hidden
      >
        {bars.map((b, i) => (
          <div
            key={i}
            className={`acta-wave-bar w-1 shrink-0 rounded-full ${b.bg} ${b.h}`}
            style={{
              animationDelay: `${b.delayMs}ms`,
              animationDuration: `${b.durationMs}ms`,
            }}
          />
        ))}
      </div>
      <button
        type="button"
        className="pointer-events-auto relative flex size-[5.75rem] items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        aria-label="Open home and start voice input"
        onClick={() => {
          void navigate("/", { state: ACTIVATE_MIC_ON_HOME });
        }}
      >
        <div
          className="acta-mic-pulse-ring pointer-events-none absolute aspect-square w-[5.75rem] rounded-full border border-[rgba(78,222,163,0.35)]"
          aria-hidden
        />
        <div
          className="acta-mic-pulse-ring-delayed pointer-events-none absolute aspect-square w-[5.75rem] rounded-full border border-[rgba(78,222,163,0.25)]"
          aria-hidden
        />
        <div className="acta-mic-button-glow relative flex size-[3.75rem] shrink-0 items-center justify-center rounded-full bg-[rgba(78,222,163,0.2)] shadow-[0px_0px_40px_0px_rgba(78,222,163,0.3)]">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(78,222,163,0.3)] opacity-20" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(78,222,163,0.1)]" />
          <div className="relative size-[calc(5.75rem*0.4)] shrink-0">
            <img
              alt=""
              className="absolute inset-0 size-full max-w-none object-contain"
              src={imgMic}
            />
          </div>
        </div>
      </button>
      <p className="acta-nav-mic-status -translate-y-[12px] text-center text-[8px] font-bold uppercase leading-3 tracking-[1.6px] text-[rgba(185,199,224,0.5)]">
        MIC OFF
      </p>
    </div>
  );
}
