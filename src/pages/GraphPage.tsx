import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  clearGraphFlowComplete,
  readGraphFlowComplete,
  writeGraphFlowComplete,
} from '../graphFlowStorage'

const imgUserProfile =
  'https://www.figma.com/api/mcp/asset/62a50c2d-ed0c-46b1-a196-24ef5cc6c4b9'
const imgMessages = 'https://www.figma.com/api/mcp/asset/48e0d446-cdf9-4c63-a566-1ce2d114f799'
const imgCheck = 'https://www.figma.com/api/mcp/asset/6f9c5a7b-b87d-4bc7-bd68-74cb75e6ae98'
const imgCalendar = 'https://www.figma.com/api/mcp/asset/ca90f40a-91bc-4d77-b3d0-f10ec1f2d348'
const imgForkKnife = 'https://www.figma.com/api/mcp/asset/c1a08f2a-0706-4427-a3f5-7b68d3060e45'
const imgBell = 'https://www.figma.com/api/mcp/asset/bd5c3338-25a3-499b-a65d-d8517347f191'
const imgEllipsis = 'https://www.figma.com/api/mcp/asset/adf72b64-0fc3-4174-a5f2-a3b2ff753fbe'
const imgSearchBtn = 'https://www.figma.com/api/mcp/asset/9267dc38-be11-43d8-a9fc-c1a80d0c5152'
const imgNavHome = 'https://www.figma.com/api/mcp/asset/5f25d71e-048e-4466-a547-3bc08a28ae4e'
const imgNavApps = 'https://www.figma.com/api/mcp/asset/3a73b60f-81bc-41c1-800d-bb1ffb6c105a'
const imgNavGraph = 'https://www.figma.com/api/mcp/asset/c99d45b1-72b8-403d-8758-3282783df4a8'
const imgNavSettings = 'https://www.figma.com/api/mcp/asset/0d61da53-0691-462f-b30d-10f400fd9aa4'

const YELP_URL = 'https://www.yelp.com/biz/tori-tori-shabu-n-sushi-arcadia-2'

const TORI_PHOTOS = [
  { src: '/images/tori-tori/01-exterior.png', alt: 'Tori Tori Shabu N Sushi — exterior' },
  { src: '/images/tori-tori/02-interior.png', alt: 'Tori Tori — interior' },
  { src: '/images/tori-tori/03-food.png', alt: 'Tori Tori — shabu and sushi' },
  { src: '/images/tori-tori/04-menu-1.png', alt: 'Tori Tori — menu page 1' },
  { src: '/images/tori-tori/05-menu-2.png', alt: 'Tori Tori — menu page 2' },
] as const

/** Default time each step stays in “loading” before showing the green check */
const STEP_LOAD_MS = 2400

type StepStatus = 'pending' | 'loading' | 'done'

type StepConfig = {
  title: string
  icon: string
  iconSize: 'size-5' | 'h-5 w-[18px]' | 'h-5 w-[15px]' | 'h-[20px] w-5'
  /** Override loading duration (ms). New Sarah message step uses 3× default. */
  loadDurationMs?: number
  doneDetail: string
}

const STEPS: StepConfig[] = [
  {
    title: 'Found Sarah in Messages',
    icon: imgMessages,
    iconSize: 'size-5',
    doneDetail: '08:42:01 AM',
  },
  {
    title: 'Checked calendar availability',
    icon: imgCalendar,
    iconSize: 'h-5 w-[18px]',
    doneDetail: '08:42:05 AM',
  },
  {
    title: 'Sent message to Sarah to confirm availability for 7PM tomorrow',
    icon: imgMessages,
    iconSize: 'size-5',
    loadDurationMs: STEP_LOAD_MS * 3,
    doneDetail: 'Sarah confirmed',
  },
  {
    title: 'Booking table via OpenTable',
    icon: imgForkKnife,
    iconSize: 'h-5 w-[15px]',
    doneDetail: '08:42:22 AM',
  },
  {
    title: 'Send confirmation message',
    icon: imgBell,
    iconSize: 'h-[20px] w-5',
    doneDetail: '08:42:28 AM',
  },
  {
    title: 'Sarah Jenkins accepted the invite',
    icon: imgCalendar,
    iconSize: 'h-5 w-[18px]',
    loadDurationMs: 10_000,
    doneDetail: 'Invite accepted',
  },
]

function tomorrowLabel() {
  const t = new Date()
  t.setDate(t.getDate() + 1)
  return t.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}

function initialStepStatuses(fromPreviewApprove: boolean): StepStatus[] {
  if (fromPreviewApprove) {
    clearGraphFlowComplete()
    return Array.from({ length: STEPS.length }, (_, i) => (i === 0 ? 'loading' : 'pending'))
  }
  if (readGraphFlowComplete()) {
    return STEPS.map(() => 'done')
  }
  return Array.from({ length: STEPS.length }, (_, i) => (i === 0 ? 'loading' : 'pending'))
}

export function GraphPage() {
  const location = useLocation()
  const fromPreviewApprove =
    (location.state as { fromPreviewApprove?: boolean } | null)?.fromPreviewApprove === true

  const calendarCardRef = useRef<HTMLDivElement>(null)
  const [toriPhotoIndex, setToriPhotoIndex] = useState(0)

  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(() =>
    initialStepStatuses(fromPreviewApprove),
  )

  useEffect(() => {
    if (readGraphFlowComplete()) return

    const timeouts: ReturnType<typeof setTimeout>[] = []

    const advance = (index: number) => {
      if (index >= STEPS.length) return
      const delay = STEPS[index].loadDurationMs ?? STEP_LOAD_MS
      timeouts.push(
        setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev] as StepStatus[]
            next[index] = 'done'
            if (index + 1 < STEPS.length) {
              next[index + 1] = 'loading'
            }
            return next
          })
          advance(index + 1)
        }, delay),
      )
    }

    advance(0)

    return () => timeouts.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (stepStatuses.length && stepStatuses.every((s) => s === 'done')) {
      writeGraphFlowComplete()
    }
  }, [stepStatuses])

  const allDone = stepStatuses.every((s) => s === 'done')
  const openTableDone = stepStatuses[3] === 'done'
  const confirmationDone = stepStatuses[4] === 'done'
  const inviteAcceptedDone = stepStatuses[STEPS.length - 1] === 'done'

  useEffect(() => {
    if (!inviteAcceptedDone || !confirmationDone) return
    const id = window.setTimeout(() => {
      calendarCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(id)
  }, [inviteAcceptedDone, confirmationDone])

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Graph flow">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">
              {allDone ? 'Complete' : 'Running'}
            </p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Dinner with Sarah
            </h1>
            <div className="pt-1">
              <p className="text-[14px] font-normal leading-5 text-[#bbcabf]">
                Orchestrating cross-platform logistics to finalize your evening plans.
              </p>
            </div>
          </header>

          <ul className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <GraphStepRow
                key={step.title}
                title={step.title}
                icon={step.icon}
                iconSizeClass={step.iconSize}
                status={stepStatuses[i] ?? 'pending'}
                doneSubtitle={step.doneDetail}
              />
            ))}
          </ul>

          <div
            id="tori-tori-gallery"
            className={`overflow-hidden rounded-2xl border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] transition-opacity duration-500 ${
              openTableDone ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className="relative isolate aspect-[4/3] w-full overflow-hidden bg-[#0f0f0f]">
              {TORI_PHOTOS.map((photo, i) => (
                <img
                  key={photo.src}
                  alt={photo.alt}
                  src={photo.src}
                  className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
                    i === toriPhotoIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(28,27,27,0.85)] via-transparent to-[rgba(0,0,0,0.15)]" />
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {TORI_PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Photo ${i + 1} of ${TORI_PHOTOS.length}`}
                    aria-current={i === toriPhotoIndex}
                    className={`h-1.5 rounded-full transition-all ${
                      i === toriPhotoIndex
                        ? 'w-5 bg-[#4edea3]'
                        : 'w-1.5 bg-[rgba(187,202,191,0.35)]'
                    }`}
                    onClick={() => setToriPhotoIndex(i)}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(19,19,19,0.65)] text-lg leading-none text-[#e5e2e1] backdrop-blur-sm transition hover:bg-[rgba(19,19,19,0.85)]"
                onClick={() =>
                  setToriPhotoIndex((v) => (v - 1 + TORI_PHOTOS.length) % TORI_PHOTOS.length)
                }
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(19,19,19,0.65)] text-lg leading-none text-[#e5e2e1] backdrop-blur-sm transition hover:bg-[rgba(19,19,19,0.85)]"
                onClick={() => setToriPhotoIndex((v) => (v + 1) % TORI_PHOTOS.length)}
              >
                ›
              </button>
            </div>
            <div className="space-y-3 px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                    Tori Tori Shabu N Sushi
                  </p>
                  <p className="text-[12px] leading-4 text-[#bbcabf]">Arcadia, CA 91007</p>
                </div>
                <span className="shrink-0 rounded bg-[rgba(78,222,163,0.1)] px-2 py-1 text-[10px] leading-[15px] text-[#4edea3]">
                  MATCHED
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium">
                <a
                  href={YELP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4edea3] underline decoration-[rgba(78,222,163,0.35)] underline-offset-2 hover:decoration-[#4edea3]"
                >
                  Yelp
                </a>
                <Link
                  to="/graph/menu"
                  className="text-[#4edea3] underline decoration-[rgba(78,222,163,0.35)] underline-offset-2 hover:decoration-[#4edea3]"
                >
                  Menu
                </Link>
              </div>
            </div>
          </div>

          {confirmationDone && (
            <div
              ref={calendarCardRef}
              id="graph-calendar-card"
              className="graph-calendar-enter scroll-mt-3 overflow-hidden rounded-2xl border border-[rgba(60,74,66,0.15)] bg-[#1c1b1b]"
            >
              <div className="border-b border-[rgba(60,74,66,0.1)] bg-[rgba(78,222,163,0.06)] px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[rgba(78,222,163,0.12)]">
                    <img alt="" className="h-5 w-[18px] object-contain" src={imgCalendar} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#bbcabf]">
                      Calendar
                    </p>
                    <p className="text-[14px] font-medium leading-5 text-[#4edea3]">Event created</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 px-5 py-5">
                <div>
                  <p className="text-[18px] font-semibold leading-6 text-[#e5e2e1]">
                    Dinner with Sarah
                  </p>
                  <p className="mt-1 text-[14px] leading-5 text-[#bbcabf]">
                    {tomorrowLabel()} · 7:00 PM
                  </p>
                </div>
                <div className="rounded-xl border border-[rgba(60,74,66,0.12)] bg-[#131313] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#bbcabf]">
                    Invitee
                  </p>
                  <p className="mt-1 text-[15px] font-medium leading-5 text-[#e5e2e1]">
                    Sarah Jenkins
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <header className="acta-header-fixed flex h-16 items-center justify-between bg-[#131313] px-6">
        <div className="size-8 overflow-hidden rounded-full bg-[#2a2a2a]">
          <img alt="" className="size-full object-cover" src={imgUserProfile} />
        </div>
        <button type="button" className="relative size-[34px]">
          <img alt="Search" className="absolute inset-0 size-full" src={imgSearchBtn} />
        </button>
      </header>

      <nav
        className="acta-nav-fixed flex h-20 items-center justify-between bg-[rgba(19,19,19,0.9)] px-8 backdrop-blur-[12px]"
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center justify-center p-3">
          <img alt="" className="h-[18px] w-4" src={imgNavHome} />
        </Link>
        <Link to="/connectors" className="flex items-center justify-center p-3">
          <img alt="" className="size-[19.3px]" src={imgNavApps} />
        </Link>
        <div className="flex items-center justify-center p-3">
          <img
            alt=""
            className="h-[23px] w-6 drop-shadow-[0_0_10px_rgba(78,222,163,0.85)]"
            src={imgNavGraph}
          />
        </div>
        <Link to="/connectors" className="flex items-center justify-center p-3">
          <img alt="" className="h-5 w-[20.1px]" src={imgNavSettings} />
        </Link>
      </nav>
    </div>
  )
}

/** Compact waveform pulse — aligns with home “sound wave” / orchestration steps */
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
  )
}

function GraphStepRow({
  title,
  icon,
  iconSizeClass,
  status,
  doneSubtitle,
}: {
  title: string
  icon: string
  iconSizeClass: string
  status: StepStatus
  doneSubtitle: string
}) {
  const pending = status === 'pending'
  const loading = status === 'loading'
  const done = status === 'done'

  const iconBoxClass = loading
    ? 'bg-[rgba(78,222,163,0.1)]'
    : 'bg-[#1c1b1b]'

  return (
    <li
      className={`flex items-start gap-4 py-1 transition-opacity duration-300 ${
        pending ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconBoxClass}`}
      >
        <img alt="" className={`${iconSizeClass} object-contain`} src={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] leading-snug text-[#e5e2e1]">{title}</p>
        {done && (
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
        {pending && <img alt="" className="size-[16.67px] opacity-70" src={imgEllipsis} />}
      </div>
    </li>
  )
}
