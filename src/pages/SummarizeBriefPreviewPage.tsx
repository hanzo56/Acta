import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ICON_DOC as imgDoc,
  ICON_INSIGHT as imgInsight,
  ICON_LIST as imgList,
  ICON_SEARCH as imgSearch,
} from "../assets/actaIconUrls";
import { ActaPreviewTimelineStep } from "../components/ActaPreviewTimelineStep";
import { RemoteNavMicCluster } from "../components/RemoteNavMicCluster";
import {
  type SummarizeBriefScenario,
  writeSummarizeBriefScenario,
} from "../scenarioSession";

type ChatTurn = { role: "acta" | "you"; text: string };

const SCENARIO_BLURB =
  "You’re prepping for a vendor security review — Acta will compress a long packet into an exec-ready brief with decisions and open questions.";

const QUESTIONS: {
  key: keyof SummarizeBriefScenario;
  prompt: string;
  placeholder: string;
  chips: string[];
}[] = [
  {
    key: "document",
    prompt: "Which document should I summarize?",
    placeholder: "e.g. Acme SOC2 + DPA packet (uploaded to Vault)",
    chips: ["Acme SOC2 + DPA packet", "Northwind pen-test readout PDF"],
  },
  {
    key: "audience",
    prompt: "Who is the primary reader?",
    placeholder: "e.g. CFO + legal counsel — board prep next week",
    chips: ["CFO + legal counsel", "CISO staff — technical deep dive"],
  },
  {
    key: "format",
    prompt: "Preferred output shape?",
    placeholder: "e.g. One-page memo + decision box + citations",
    chips: ["One-page memo + decision box", "Bullet brief + appendix links"],
  },
  {
    key: "sensitivity",
    prompt: "Any confidentiality rules?",
    placeholder: "e.g. Keep vendor codenames internal-only",
    chips: ["Redline vendor names in external share", "Internal only — no forwarding"],
  },
];

export function SummarizeBriefPreviewPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<SummarizeBriefScenario>>({});
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState<ChatTurn[]>(() => [
    { role: "acta", text: SCENARIO_BLURB },
    { role: "acta", text: QUESTIONS[0].prompt },
  ]);

  const q = QUESTIONS[step];
  const onSummary = step >= QUESTIONS.length;
  const completeAnswers = useMemo(() => {
    if (!onSummary) return null;
    const a = answers as SummarizeBriefScenario;
    if (!a.document || !a.audience || !a.format || !a.sensitivity) return null;
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
            text: "Understood — I’ll OCR if needed, extract controls & gaps, align language to your audience, and produce the brief with traceable citations before anything leaves your tenant.",
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
              PREVIEW · SUMMARIZE BRIEF
            </p>
            <h1 className="pt-1 text-[32px] font-bold leading-9 tracking-[-0.85px] text-[#e5e2e1]">
              Vendor packet → exec brief
            </h1>
            <p className="text-[16px] font-normal leading-6 text-[#bbcabf]">
              Acta scopes source material, audience, and handling before
              summarizing.
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
              <label className="sr-only" htmlFor="summarize-brief-reply">
                Your reply
              </label>
              <textarea
                id="summarize-brief-reply"
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
                  title="Ingest"
                  body={
                    <>
                      Normalize PDFs, detect scanned pages, preserve section
                      anchors.
                    </>
                  }
                  tag="SOURCE:"
                  value={completeAnswers.document}
                  icon={imgDoc}
                />
                <ActaPreviewTimelineStep
                  title="Audience fit"
                  body={
                    <>
                      Tune depth, jargon, and risk framing for who signs off.
                    </>
                  }
                  tag="FOR:"
                  value={completeAnswers.audience}
                  icon={imgInsight}
                />
                <ActaPreviewTimelineStep
                  title="Synthesis"
                  body={
                    <>
                      Controls, gaps, timeline, and explicit decisions /
                      questions.
                    </>
                  }
                  tag="FORMAT:"
                  value={completeAnswers.format}
                  icon={imgList}
                />
                <ActaPreviewTimelineStep
                  title="Governance"
                  body={
                    <>
                      Apply labeling, watermark policy, and export restrictions.
                    </>
                  }
                  tag="RULES:"
                  value={completeAnswers.sensitivity}
                  icon={imgSearch}
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
                  writeSummarizeBriefScenario(completeAnswers);
                  navigate("/graph/summarize-brief", {
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
