import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useSpeechDictation } from '../hooks/useSpeechDictation'

const imgUserProfileAvatar =
  'https://www.figma.com/api/mcp/asset/b319f404-f6b1-4efb-b193-ec0f12841a6a'
const imgCalendar = 'https://www.figma.com/api/mcp/asset/5cec74ce-7f8f-4cd4-a30a-9c7261b926e6'
const imgForkKnife = 'https://www.figma.com/api/mcp/asset/c339afaa-6d27-4785-9ae9-0960043575d1'
const imgChat = 'https://www.figma.com/api/mcp/asset/c7fe6845-f62d-4db3-9105-1d362e34762f'
const imgList = 'https://www.figma.com/api/mcp/asset/472d8e13-d25c-49fc-ae41-6ccf38c27981'
const imgMic = 'https://www.figma.com/api/mcp/asset/190802c2-b8f1-4e53-adde-8cac5c349fa9'
const imgSettingsHeader = 'https://www.figma.com/api/mcp/asset/6a2a8927-eaf0-40c9-a836-fd65a36d6824'
const imgNavHome = 'https://www.figma.com/api/mcp/asset/f8159318-98f5-4a10-b23a-f31f75ab63d2'
const imgNavApps = 'https://www.figma.com/api/mcp/asset/2f0e5483-ac22-4b91-b8e3-e37f972705eb'
const imgNavGraph = 'https://www.figma.com/api/mcp/asset/7855d582-3072-4873-b03d-5ef445275ad5'
const imgNavSettings = 'https://www.figma.com/api/mcp/asset/cb903a54-72f1-4f23-92c3-c40fa0a0ccf6'

/** Max bar height (scaleY animates from ~22% to 100% of this) */
const bars = [
  { h: 'h-6', bg: 'bg-[#4edea3]', delayMs: 0, durationMs: 520 },
  { h: 'h-10', bg: 'bg-[#10b981]', delayMs: 80, durationMs: 580 },
  { h: 'h-4', bg: 'bg-[#d0bcff]', delayMs: 160, durationMs: 480 },
  { h: 'h-12', bg: 'bg-[#4edea3]', delayMs: 40, durationMs: 620 },
  { h: 'h-8', bg: 'bg-[#b090ff]', delayMs: 120, durationMs: 540 },
  { h: 'h-[18px]', bg: 'bg-[#10b981]', delayMs: 200, durationMs: 500 },
  { h: 'h-7', bg: 'bg-[#4edea3]', delayMs: 60, durationMs: 560 },
] as const

const SILENCE_MS = 3000
const PROCESSING_BEFORE_NAV_MS = 2000

/** Spoken intent → phone-activity preview instead of dinner preview */
const PHONE_UPDATE_INTENT =
  /\b(?:give me a status update on my phone activit(?:y|ies|es)|give me an update on my phone activit(?:y|ies)|give me an update on my phone activity|give me an update|give (?:me )?(?:an )?update|provide (?:me )?(?:with )?(?:an )?update|provide me an update on my phone activit(?:y|ies)|provide me a status update on my phone activit(?:y|ies|es)|an update on my phone activit(?:y|ies)|update (?:on|about) my phone(?: activit(?:y|ies))?|updates? (?:on|about|for) my phone|phone activit(?:y|ies) (?:update|summary)|summar(?:y|ize|ise) (?:of )?my phone|what(?:'s| is) (?:happening |going )?on my phone|any updates? (?:on|about|for) my phone|phone update|activity update|check my phone)\b/i

export function HomePage() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [micListening, setMicListening] = useState(false)
  const [silenceProcessing, setSilenceProcessing] = useState(false)
  const silenceNavigatedRef = useRef(false)
  const processingNavTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dictationSnapshotRef = useRef('')

  const handleDictationSilence = useCallback(() => {
    if (silenceNavigatedRef.current) return
    silenceNavigatedRef.current = true
    setMicListening(false)
    setSilenceProcessing(true)
    processingNavTimeoutRef.current = window.setTimeout(() => {
      processingNavTimeoutRef.current = null
      const t = dictationSnapshotRef.current
      const goPhoneUpdate = PHONE_UPDATE_INTENT.test(t)
      navigate(goPhoneUpdate ? '/preview/update' : '/preview')
    }, PROCESSING_BEFORE_NAV_MS)
  }, [navigate])

  useEffect(() => {
    return () => {
      if (processingNavTimeoutRef.current) {
        clearTimeout(processingNavTimeoutRef.current)
      }
    }
  }, [])

  const prevMicOnRef = useRef(false)
  useEffect(() => {
    if (micListening && !prevMicOnRef.current) {
      silenceNavigatedRef.current = false
    }
    prevMicOnRef.current = micListening
  }, [micListening])

  const speechDictationOptions = useMemo(
    () => ({
      silenceMs: SILENCE_MS,
      onSilence: handleDictationSilence,
    }),
    [handleDictationSilence],
  )

  const { finalText, interimText, status: dictationStatus } = useSpeechDictation(
    micListening,
    speechDictationOptions,
  )

  useEffect(() => {
    dictationSnapshotRef.current = `${finalText} ${interimText}`.trim()
  }, [finalText, interimText])

  /** Real-time levels use `getUserMedia`, which fights Web Speech’s own mic — keep one pipeline (speech only). */
  const micClusterIdle = !micListening && !silenceProcessing

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-start justify-center overflow-hidden opacity-40 blur-[20px]">
        <div className="pointer-events-none absolute inset-0 bg-[#1c1b1b] mix-blend-saturation" aria-hidden />
        <div className="grid w-full flex-1 grid-cols-1 gap-8 p-8">
          <div className="flex flex-col gap-6">
            <div className="h-64 w-full rounded-xl bg-[#1c1b1b]" />
            <div className="h-32 w-full rounded-xl bg-[#1c1b1b]" />
            <div className="h-96 w-full rounded-xl bg-[#1c1b1b]" />
          </div>
          <div className="w-[326px]">
            <div className="h-48 w-full rounded-xl bg-[#1c1b1b]" />
          </div>
        </div>
      </div>

      <main className="acta-main acta-main--inset-both px-6">
        <div className="flex w-full max-w-[768px] flex-col items-center gap-8 py-6">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col gap-4">
              <div className="text-center font-extrabold leading-10 tracking-[-0.9px] text-[36px] text-[#e5e2e1]">
                <p className="mb-0">Welcome Julian,</p>
                <p className="mb-0">how can I help you</p>
                <p>today?</p>
              </div>
              <div className="text-center font-light text-[18px] leading-7 tracking-[0.45px] text-[rgba(187,202,191,0.6)]">
                <p className="mb-0">Acta is ready to orchestrate</p>
                <p>your next task.</p>
              </div>
            </div>

            <section
              aria-label="Voice dictation"
              className="box-border w-full min-h-[7.5rem] max-h-[min(40vh,18rem)] rounded-2xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-4 py-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[11px] font-bold uppercase leading-4 tracking-[1.2px] text-[rgba(185,199,224,0.55)]">
                  Voice input
                </p>
                {micListening && dictationStatus === 'listening' ? (
                  <span className="text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-[#4edea3]">
                    Live
                  </span>
                ) : null}
              </div>
              <div
                className="max-h-[min(32vh,15rem)] overflow-y-auto text-left text-[15px] leading-6 tracking-[0.2px]"
                aria-live="polite"
                aria-relevant="additions text"
              >
                {dictationStatus === 'unsupported' ? (
                  <p className="text-[rgba(187,202,191,0.78)]">
                    Speech recognition isn’t available in this browser. Try Chrome on desktop.
                  </p>
                ) : null}
                {dictationStatus === 'denied' ? (
                  <p className="text-[rgba(187,202,191,0.78)]">
                    Microphone access was blocked. Allow the microphone for this site in your browser
                    settings, then try again.
                  </p>
                ) : null}
                {dictationStatus !== 'unsupported' && dictationStatus !== 'denied' ? (
                  <>
                    {!finalText && !interimText && !micListening ? (
                      <p className="text-[rgba(187,202,191,0.5)]">
                        Tap the microphone below to dictate. Your words will appear here.
                      </p>
                    ) : null}
                    {!finalText &&
                    !interimText &&
                    micListening &&
                    dictationStatus === 'listening' ? (
                      <p className="text-[rgba(187,202,191,0.55)]">Listening… speak now.</p>
                    ) : null}
                    {finalText || interimText ? (
                      <p className="whitespace-pre-wrap break-words text-[#e5e2e1]">
                        <span>{finalText}</span>
                        <span className="text-[rgba(229,226,225,0.78)]">{interimText}</span>
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div>
            </section>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <Link
              to="/preview"
              className="flex items-center gap-3 rounded-2xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-6 py-[17px]"
            >
              <div className="relative h-[22px] w-[21px] shrink-0">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgCalendar} />
              </div>
              <span className="text-center text-[16px] font-medium leading-6 text-[#e5e2e1]">
                Plan a meeting
              </span>
            </Link>
            <button
              type="button"
              className="flex items-center gap-3 rounded-2xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-6 py-[17px]"
            >
              <div className="relative h-5 w-[15px] shrink-0">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgForkKnife} />
              </div>
              <span className="text-center text-[16px] font-medium leading-6 text-[#e5e2e1]">
                Book dinner
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 rounded-2xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-6 py-[17px]"
            >
              <div className="relative size-5 shrink-0">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgChat} />
              </div>
              <span className="text-center text-[16px] font-medium leading-6 text-[#e5e2e1]">
                Message team
              </span>
            </button>
            <button
              type="button"
              className="flex items-center gap-3 rounded-2xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-6 py-[17px]"
            >
              <div className="relative h-4 w-[18px] shrink-0">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgList} />
              </div>
              <span className="text-center text-[16px] font-medium leading-6 text-[#e5e2e1]">
                Summarize Brief
              </span>
            </button>
          </div>
        </div>
      </main>

      <header className="acta-header-fixed flex h-16 items-center justify-between bg-[rgba(19,19,19,0.6)] px-6 backdrop-blur-[12px]">
        <img
          src="/acta-logo.png"
          alt="Acta"
          className="block h-9 w-auto max-w-[min(60vw,220px)] object-contain object-left"
        />
        <div className="flex items-center gap-4">
          <Link
            to="/settings"
            className="relative block h-9 w-[36.1px] shrink-0"
            aria-label="Settings"
          >
            <img alt="" className="absolute inset-0 size-full max-w-none" src={imgSettingsHeader} />
          </Link>
          <Link
            to="/profile"
            className="size-8 shrink-0 overflow-hidden rounded-full border border-[rgba(60,74,66,0.2)] bg-[#2a2a2a] p-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(19,19,19,0.6)]"
            aria-label="Profile"
          >
            <img alt="" className="size-full object-cover" src={imgUserProfileAvatar} />
          </Link>
        </div>
      </header>

      <nav
        className="acta-nav-fixed acta-nav-home h-20 overflow-visible bg-[rgba(19,19,19,0.9)] backdrop-blur-[12px]"
        aria-label="Primary"
      >
        <div className="relative mx-auto h-20 w-full max-w-[390px]">
          <div
            className={`pointer-events-none absolute left-1/2 top-0 z-50 flex w-[min(100%,220px)] -translate-x-1/2 -translate-y-[42%] flex-col items-center gap-1 ${micClusterIdle ? 'acta-nav-mic--idle' : ''}`}
          >
            <div
              className="flex h-8 w-full max-w-[200px] items-end justify-center gap-1"
              aria-hidden
            >
              {silenceProcessing ? (
                <div className="h-8 w-full max-w-[200px]" aria-hidden />
              ) : (
                bars.map((b, i) => (
                  <div
                    key={i}
                    className={`acta-wave-bar w-1 shrink-0 rounded-full ${b.bg} ${b.h}`}
                    style={{
                      animationDelay: `${b.delayMs}ms`,
                      animationDuration: `${b.durationMs}ms`,
                    }}
                  />
                ))
              )}
            </div>
            {silenceProcessing ? (
              <div
                className="pointer-events-auto relative flex size-[4.5rem] items-center justify-center rounded-full bg-[rgba(78,222,163,0.15)] shadow-[0px_0px_20px_0px_rgba(78,222,163,0.2)]"
                role="status"
                aria-live="polite"
                aria-label="Processing"
              >
                <div className="size-9 rounded-full border-2 border-[rgba(78,222,163,0.3)] border-t-[#4edea3] animate-spin" />
              </div>
            ) : (
              <button
                type="button"
                aria-pressed={micListening}
                aria-label={micListening ? 'Microphone on, listening' : 'Microphone off, tap to listen'}
                onClick={() => setMicListening((v) => !v)}
                className="pointer-events-auto relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <div
                  className="acta-mic-pulse-ring pointer-events-none absolute aspect-square w-[4.5rem] rounded-full border border-[rgba(78,222,163,0.35)]"
                  aria-hidden
                />
                <div
                  className="acta-mic-pulse-ring-delayed pointer-events-none absolute aspect-square w-[4.5rem] rounded-full border border-[rgba(78,222,163,0.25)]"
                  aria-hidden
                />
                <div className="acta-mic-button-glow relative flex items-center justify-center rounded-full bg-[rgba(78,222,163,0.2)] p-4 shadow-[0px_0px_28px_0px_rgba(78,222,163,0.28)]">
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(78,222,163,0.3)] opacity-20" />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(78,222,163,0.1)]" />
                  <div className="relative h-7 w-5 shrink-0">
                    <img
                      alt=""
                      className="acta-mic-icon-animate absolute inset-0 size-full max-w-none"
                      src={imgMic}
                    />
                  </div>
                </div>
              </button>
            )}
            <p
              className={`acta-nav-mic-status mt-0.5 text-center text-[8px] font-bold uppercase leading-3 tracking-[1.6px] ${
                silenceProcessing
                  ? 'text-[#4edea3]'
                  : micListening
                    ? 'acta-listening-text text-[#4edea3]'
                    : 'text-[rgba(185,199,224,0.5)]'
              }`}
            >
              {silenceProcessing ? 'PROCESSING' : micListening ? 'LISTENING' : 'MIC OFF'}
            </p>
          </div>

          <div className="grid h-full w-full grid-cols-5 items-end gap-0 px-1 pb-2 pt-0">
            <Link
              to="/"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative h-[18px] w-4">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgNavHome} />
              </div>
              <span
                className={`text-[8px] font-bold uppercase leading-3 tracking-[0.8px] ${pathname === '/' ? 'text-[#4edea3]' : 'text-[rgba(185,199,224,0.5)]'}`}
              >
                HOME
              </span>
            </Link>
            <Link
              to="/tasks"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative size-[19.3px]">
                <img
                  alt=""
                  className={`absolute inset-0 size-full max-w-none ${pathname === '/tasks' ? 'drop-shadow-[0_0_8px_rgba(78,222,163,0.75)]' : ''}`}
                  src={imgNavApps}
                />
              </div>
              <span
                className={`text-[8px] font-bold uppercase leading-3 tracking-[0.8px] ${pathname === '/tasks' ? 'text-[#4edea3]' : 'text-[rgba(185,199,224,0.5)]'}`}
              >
                TASKS
              </span>
            </Link>
            <div className="flex justify-center" aria-hidden />
            <Link
              to="/graph"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative h-[23px] w-6">
                <img
                  alt=""
                  className={`absolute inset-0 size-full max-w-none ${pathname === '/graph' ? 'drop-shadow-[0_0_10px_rgba(78,222,163,0.85)]' : ''}`}
                  src={imgNavGraph}
                />
              </div>
              <span
                className={`text-[8px] font-bold uppercase leading-3 tracking-[0.8px] ${pathname === '/graph' ? 'text-[#4edea3]' : 'text-[rgba(185,199,224,0.5)]'}`}
              >
                GRAPH
              </span>
            </Link>
            <Link
              to="/settings"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative h-5 w-[20.1px]">
                <img
                  alt=""
                  className={`absolute inset-0 size-full max-w-none ${pathname === '/settings' ? 'drop-shadow-[0_0_8px_rgba(78,222,163,0.9)]' : ''}`}
                  src={imgNavSettings}
                />
              </div>
              <span
                className={`text-[8px] font-bold uppercase leading-3 tracking-[0.8px] ${pathname === '/settings' ? 'text-[#4edea3]' : 'text-[rgba(185,199,224,0.5)]'}`}
              >
                SETTINGS
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
