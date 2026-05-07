import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ICON_CALENDAR as imgCalendar,
  ICON_FORK_KNIFE as imgForkKnife,
  ICON_MESSAGES as imgMessages,
  ICON_OPENTABLE as imgOpenTable,
} from "../assets/actaIconUrls";
import { ActaPreviewTimelineStep } from "../components/ActaPreviewTimelineStep";
import { RemoteNavMicCluster } from "../components/RemoteNavMicCluster";
import {
  type BookDinnerScenario,
  writeBookDinnerScenario,
} from "../scenarioSession";

type ChatTurn = { role: "acta" | "you"; text: string };

const SCENARIO_BLURB =
  "You want a working dinner before Friday’s roadmap review — quiet enough for decisions, impressive enough for a design lead.";

const QUESTIONS: {
  key: keyof BookDinnerScenario;
  prompt: string;
  placeholder: string;
  chips: string[];
}[] = [
  {
    key: "guest",
    prompt: "Who should I book dinner with?",
    placeholder: "e.g. Maya Chen — Design Lead",
    chips: ["Maya Chen — Design Lead", "Alex Rivera — PM partner"],
  },
  {
    key: "restaurant",
    prompt: "Any restaurant in mind, or should I propose a shortlist?",
    placeholder: "e.g. Open to suggestions near Downtown LA",
    chips: ["Open to suggestions near Downtown LA", "Try Providence if available"],
  },
  {
    key: "cuisine",
    prompt: "What cuisine or vibe should I optimize for?",
    placeholder: "e.g. Seasonal California — easy to hear each other",
    chips: ["Seasonal California, calm dining room", "Japanese omakase, counter seating"],
  },
  {
    key: "when",
    prompt: "What date and time window works?",
    placeholder: "e.g. Thu 7:30pm — Fri 8pm backup",
    chips: ["Thu 7:30pm (Fri 8pm backup)", "Next Tue 6:30pm only"],
  },
];

export function BookDinnerPreviewPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<BookDinnerScenario>>({});
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState<ChatTurn[]>(() => [
    { role: "acta", text: SCENARIO_BLURB },
    { role: "acta", text: QUESTIONS[0].prompt },
  ]);

  const q = QUESTIONS[step];
  const onSummary = step >= QUESTIONS.length;
  const completeAnswers = useMemo(() => {
    if (!onSummary) return null;
    const a = answers as BookDinnerScenario;
    if (!a.guest || !a.restaurant || !a.cuisine || !a.when) return null;
    return a;
  }, [answers, onSummary]);

  const submitAnswer = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || onSummary) return;
      const current = QUESTIONS[step];
      setTranscript((t) => [...t, { role: "you", text }]);
      setAnswers((prev) => ({ ...prev, [current.key]: text }));
      setInput("");
      const next = step + 1;
      if (next < QUESTIONS.length) {
        setStep(next);
        setTranscript((t) => [
          ...t,
          { role: "acta", text: QUESTIONS[next].prompt },
        ]);
      } else {
        setStep(QUESTIONS.length);
        setTranscript((t) => [
          ...t,
          {
            role: "acta",
            text: "Thanks — I’ll align calendars, check availability with your guest, shortlist venues that match your vibe, and hold a table before I send the confirmation thread.",
          },
        ]);
      }
    },
    [onSummary, step],
  );

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <main className="acta-main acta-main--inset-preview w-full px-6 pb-44">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8">
          <header className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[2px] text-[#bbcabf]">
              PREVIEW · BOOK DINNER
            </p>
            <h1 className="pt-1 text-[32px] font-bold leading-9 tracking-[-0.85px] text-[#e5e2e1]">
              Roadmap review dinner
            </h1>
            <p className="text-[16px] font-normal leading-6 text-[#bbcabf]">
              Acta clarifies a few details, then shows the execution plan before
              anything is booked.
            </p>
          </header>

          <section
            aria-label="Conversation"
            className="flex flex-col gap-3 rounded-2xl border border-[rgba(60,74,66,0.12)] bg-[#1c1b1b] p-4"
          >
            {transcript.map((m, i) => (
              <div
                key={`${i}-${m.role}`}
                className={`flex ${m.role === "you" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[min(100%,20rem)] rounded-2xl px-4 py-3 text-[15px] leading-6 ${
                    m.role === "you"
                      ? "bg-[rgba(78,222,163,0.18)] text-[#e5e2e1]"
                      : "bg-[#131313] text-[#bbcabf]"
                  }`}
                >
                  {m.role === "acta" ? (
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-[rgba(78,222,163,0.85)]">
                      Acta
                    </span>
                  ) : (
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-[rgba(187,202,191,0.55)]">
                      You
                    </span>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
          </section>

          {!onSummary ? (
            <div className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="book-dinner-reply">
                Your reply
              </label>
              <textarea
                id="book-dinner-reply"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={q.placeholder}
                className="w-full resize-none rounded-xl border border-[rgba(60,74,66,0.2)] bg-[#131313] px-4 py-3 text-[15px] leading-6 text-[#e5e2e1] placeholder:text-[rgba(187,202,191,0.45)] focus:border-[rgba(78,222,163,0.5)] focus:outline-none focus:ring-2 focus:ring-[rgba(78,222,163,0.25)]"
              />
              <div className="flex flex-wrap gap-2">
                {q.chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => submitAnswer(c)}
                    className="rounded-full border border-[rgba(60,74,66,0.25)] bg-[#1c1b1b] px-3 py-1.5 text-[13px] leading-5 text-[#bbcabf] transition hover:border-[rgba(78,222,163,0.35)] hover:text-[#e5e2e1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {onSummary && completeAnswers ? (
            <section className="relative">
              <div
                className="absolute bottom-8 left-6 top-8 w-px bg-[rgba(60,74,66,0.2)]"
                aria-hidden
              />
              <div className="flex flex-col gap-10">
                <ActaPreviewTimelineStep
                  title="Guest & thread"
                  body={
                    <>
                      Confirm availability and dietary notes via your preferred
                      channel.
                    </>
                  }
                  tag="WITH:"
                  value={completeAnswers.guest}
                  icon={imgMessages}
                />
                <ActaPreviewTimelineStep
                  title="Venue fit"
                  body={
                    <>
                      Match cuisine, noise level, and travel time to your
                      window.
                    </>
                  }
                  tag="STYLE:"
                  value={completeAnswers.cuisine}
                  icon={imgForkKnife}
                />
                <ActaPreviewTimelineStep
                  title="Reservation"
                  body={
                    <>
                      Hold the table, add backup slots, and attach calendar
                      holds.
                    </>
                  }
                  tag="VENUE:"
                  value={completeAnswers.restaurant}
                  icon={imgOpenTable}
                />
                <ActaPreviewTimelineStep
                  title="Calendar"
                  body={
                    <>
                      Send confirmations only after you approve the final slot.
                    </>
                  }
                  tag="WHEN:"
                  value={completeAnswers.when}
                  icon={imgCalendar}
                />
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <nav
        className="acta-preview-mic-rail acta-nav-home h-20 overflow-visible bg-[rgba(19,19,19,0.9)] backdrop-blur-[12px]"
        aria-label="Quick voice to home"
      >
        <div className="relative mx-auto h-20 w-full max-w-[390px]">
          <RemoteNavMicCluster />
        </div>
      </nav>

      <div className="acta-preview-footer-fixed bg-[rgba(19,19,19,0.8)] px-6 pb-12 pt-6 backdrop-blur-[20px]">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-3">
          {!onSummary ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border border-[rgba(187,202,191,0.28)] py-[18px] text-[16px] font-semibold leading-6 text-[#bbcabf] transition hover:border-[rgba(187,202,191,0.45)] hover:bg-[rgba(255,255,255,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => submitAnswer(input)}
                disabled={!input.trim()}
                className="w-full rounded-2xl bg-[#4edea3] py-5 text-[16px] font-bold leading-6 text-[#00422b] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] transition hover:bg-[#5fe8b3] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
              >
                Send reply
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full rounded-2xl border border-[rgba(187,202,191,0.28)] py-[18px] text-[16px] font-semibold leading-6 text-[#bbcabf] transition hover:border-[rgba(187,202,191,0.45)] hover:bg-[rgba(255,255,255,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!completeAnswers}
                onClick={() => {
                  if (!completeAnswers) return;
                  writeBookDinnerScenario(completeAnswers);
                  navigate("/graph/book-dinner", {
                    state: { fromScenarioPreview: true },
                  });
                }}
                className="relative w-full rounded-2xl bg-[#4edea3] py-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] transition hover:bg-[#5fe8b3] disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
              >
                <span className="text-[16px] font-bold leading-6 text-[#00422b]">
                  Approve plan
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
