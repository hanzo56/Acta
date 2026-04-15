import { useState } from 'react'
import { Link } from 'react-router-dom'

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

export function HomePage() {
  const [micListening, setMicListening] = useState(false)

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

      <main className="acta-main acta-main--inset-both relative z-[1] px-6">
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
        <span className="text-[20px] font-bold leading-7 tracking-[-1px] text-[#e5e2e1]">
          Acta AI
        </span>
        <div className="flex items-center gap-4">
          <div className="relative h-9 w-[36.1px] shrink-0">
            <img alt="" className="absolute inset-0 size-full max-w-none" src={imgSettingsHeader} />
          </div>
          <div className="size-8 overflow-hidden rounded-full border border-[rgba(60,74,66,0.2)] bg-[#2a2a2a] p-px">
            <img alt="" className="size-full object-cover" src={imgUserProfileAvatar} />
          </div>
        </div>
      </header>

      <nav
        className="acta-nav-fixed acta-nav-home h-20 overflow-visible bg-[rgba(19,19,19,0.9)] backdrop-blur-[12px]"
        aria-label="Primary"
      >
        <div className="relative mx-auto h-20 w-full max-w-[390px]">
          <div
            className={`absolute left-1/2 top-0 z-50 flex w-[min(100%,220px)] -translate-x-1/2 -translate-y-[42%] flex-col items-center gap-1 ${!micListening ? 'acta-nav-mic--idle' : ''}`}
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
              aria-pressed={micListening}
              aria-label={micListening ? 'Microphone on, listening' : 'Microphone off, tap to listen'}
              onClick={() => setMicListening((v) => !v)}
              className="relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
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
            <p
              className={`acta-nav-mic-status mt-0.5 text-center text-[8px] font-bold uppercase leading-3 tracking-[1.6px] ${micListening ? 'acta-listening-text text-[#4edea3]' : 'text-[rgba(185,199,224,0.5)]'}`}
            >
              {micListening ? 'LISTENING' : 'MIC OFF'}
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
              <span className="text-[8px] font-bold uppercase leading-3 tracking-[0.8px] text-[#4edea3]">
                HOME
              </span>
            </Link>
            <Link
              to="/connectors"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative size-[19.3px]">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgNavApps} />
              </div>
              <span className="text-[8px] font-bold uppercase leading-3 tracking-[0.8px] text-[rgba(185,199,224,0.5)]">
                APPS
              </span>
            </Link>
            <div className="flex justify-center" aria-hidden />
            <Link
              to="/graph"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative h-[23px] w-6">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgNavGraph} />
              </div>
              <span className="text-[8px] font-bold uppercase leading-3 tracking-[0.8px] text-[rgba(185,199,224,0.5)]">
                GRAPH
              </span>
            </Link>
            <Link
              to="/connectors"
              className="flex flex-col items-center justify-end gap-1 pb-0.5"
            >
              <div className="relative h-5 w-[20.1px]">
                <img alt="" className="absolute inset-0 size-full max-w-none" src={imgNavSettings} />
              </div>
              <span className="text-[8px] font-bold uppercase leading-3 tracking-[0.8px] text-[rgba(185,199,224,0.5)]">
                SETTINGS
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
