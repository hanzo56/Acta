import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ICON_BELL as imgBell,
  ICON_CHAT as imgChat,
  ICON_MAIL as imgMail,
  ICON_MESSAGES as imgMessages,
} from "../assets/actaIconUrls";
import { ActaPreviewTimelineStep } from "../components/ActaPreviewTimelineStep";
import { RemoteNavMicCluster } from "../components/RemoteNavMicCluster";
import {
  type MessageTeamScenario,
  writeMessageTeamScenario,
} from "../scenarioSession";

type ChatTurn = { role: "acta" | "you"; text: string };

const SCENARIO_BLURB =
  "You want to async-message the Product & Eng pod with a crisp weekly update — decisions, risks, and asks — without another live meeting.";

const QUESTIONS: {
  key: keyof MessageTeamScenario;
  prompt: string;
  placeholder: string;
  chips: string[];
}[] = [
  {
    key: "channel",
    prompt: "Which channel should I post in?",
    placeholder: "e.g. Slack #product-core",
    chips: ["Slack #product-core", "Email — eng-product@company.com"],
  },
  {
    key: "topic",
    prompt: "What’s the headline update this week?",
    placeholder: "e.g. Roadmap shifts + launch risks for May",
    chips: ["Roadmap shifts + launch risks", "Q2 metrics + hiring blockers"],
  },
  {
    key: "tone",
    prompt: "What tone should I use?",
    placeholder: "e.g. Confident, approachable — short paragraphs",
    chips: ["Direct and calm", "Upbeat — celebrate the win, flag two risks"],
  },
  {
    key: "attachment",
    prompt: "Attach anything (links, dashboards, docs)?",
    placeholder: "e.g. Link Q2 funnel dashboard + Loom walkthrough",
    chips: ["Funnel dashboard only", "No attachments — text only"],
  },
];

export function MessageTeamPreviewPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<MessageTeamScenario>>({});
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState<ChatTurn[]>(() => [
    { role: "acta", text: SCENARIO_BLURB },
    { role: "acta", text: QUESTIONS[0].prompt },
  ]);

  const q = QUESTIONS[step];
  const onSummary = step >= QUESTIONS.length;
  const completeAnswers = useMemo(() => {
    if (!onSummary) return null;
    const a = answers as MessageTeamScenario;
    if (!a.channel || !a.topic || !a.tone || !a.attachment) return null;
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
            text: "Got it — I’ll draft the post, pull thread context so replies stay coherent, schedule send for your usual window, and pause if someone @mentions legal.",
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
              PREVIEW · MESSAGE TEAM
            </p>
            <h1 className="pt-1 text-[32px] font-bold leading-9 tracking-[-0.85px] text-[#e5e2e1]">
              Weekly pod update
            </h1>
            <p className="text-[16px] font-normal leading-6 text-[#bbcabf]">
              Acta captures channel, substance, and tone before drafting or
              sending.
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
              <label className="sr-only" htmlFor="message-team-reply">
                Your reply
              </label>
              <textarea
                id="message-team-reply"
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
                  title="Placement"
                  body={
                    <>
                      Post where your team already expects updates — respect
                      retention rules.
                    </>
                  }
                  tag="CHANNEL:"
                  value={completeAnswers.channel}
                  icon={imgChat}
                />
                <ActaPreviewTimelineStep
                  title="Draft"
                  body={
                    <>
                      Structure: headline, three bullets, explicit asks, quiet
                      Friday follow-up.
                    </>
                  }
                  tag="TOPIC:"
                  value={completeAnswers.topic}
                  icon={imgMessages}
                />
                <ActaPreviewTimelineStep
                  title="Voice"
                  body={
                    <>
                      Match leadership voice and edit pass for clarity.
                    </>
                  }
                  tag="TONE:"
                  value={completeAnswers.tone}
                  icon={imgMail}
                />
                <ActaPreviewTimelineStep
                  title="Send window"
                  body={
                    <>
                      Attach only what you approved; strip tracked links if
                      policy requires.
                    </>
                  }
                  tag="ATTACH:"
                  value={completeAnswers.attachment}
                  icon={imgBell}
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
                  writeMessageTeamScenario(completeAnswers);
                  navigate("/graph/message-team", {
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
