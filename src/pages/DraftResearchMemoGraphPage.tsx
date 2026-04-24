import { AppBottomNav } from '../components/AppBottomNav'
import {
  ICON_CHECK as imgCheck,
  ICON_DOC as imgTaskDoc,
  ICON_ELLIPSIS as imgEllipsis,
  ICON_MESSAGES as imgMessages,
  ICON_SEARCH as imgSearchBtn,
  ICON_USER_AVATAR as imgUserProfile,
} from '../assets/actaIconUrls'

type StepStatus = 'pending' | 'loading' | 'done'

const STEPS: {
  title: string
  icon: string
  iconSize: string
  doneDetail?: string
}[] = [
  {
    title: 'Indexed internal repositories and tagged prior research memos',
    icon: imgMessages,
    iconSize: 'size-5',
    doneDetail: '10:02:14 AM',
  },
  {
    title: 'Ingested public filings and market data feeds for coverage names',
    icon: imgTaskDoc,
    iconSize: 'h-5 w-5',
    doneDetail: '10:06:41 AM',
  },
  {
    title: 'Synthesizing competitive landscape and positioning section',
    icon: imgTaskDoc,
    iconSize: 'h-5 w-5',
  },
  {
    title: 'Draft executive summary and recommendation bullets',
    icon: imgMessages,
    iconSize: 'size-5',
  },
  {
    title: 'Citation pass, compliance review, and export to shared workspace',
    icon: imgTaskDoc,
    iconSize: 'h-5 w-5',
  },
]

const STEP_STATUSES: StepStatus[] = ['done', 'done', 'loading', 'pending', 'pending']

export function DraftResearchMemoGraphPage() {
  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Draft research memo graph">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">Running</p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Draft research memo
            </h1>
            <div className="pt-1">
              <p className="text-[14px] font-normal leading-5 text-[#bbcabf]">
                Synthesizing market data from internal repositories and public filings — mid-run.
              </p>
            </div>
          </header>

          <ul className="flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <DraftMemoGraphStepRow
                key={step.title}
                title={step.title}
                icon={step.icon}
                iconSizeClass={step.iconSize}
                status={STEP_STATUSES[i] ?? 'pending'}
                doneSubtitle={step.doneDetail ?? ''}
              />
            ))}
          </ul>

          <section
            className="rounded-2xl border border-[rgba(60,74,66,0.15)] bg-[#1c1b1b] px-5 py-4"
            aria-label="Overall progress"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[1px] text-[#bbcabf]">Progress</p>
              <p className="text-[14px] font-semibold tabular-nums text-[#4edea3]">65%</p>
            </div>
            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(60,74,66,0.35)]"
              role="progressbar"
              aria-valuenow={65}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full w-[65%] rounded-full bg-[#4edea3]" />
            </div>
            <p className="mt-3 text-[13px] leading-5 text-[rgba(187,202,191,0.75)]">
              Current step is the third of five — drafting continues while earlier pulls stay verified.
            </p>
          </section>
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

      <AppBottomNav />
    </div>
  )
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
  )
}

function DraftMemoGraphStepRow({
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

  const iconBoxClass = loading ? 'bg-[rgba(78,222,163,0.1)]' : 'bg-[#1c1b1b]'

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
        {done && doneSubtitle ? (
          <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(187,202,191,0.7)]">
            {doneSubtitle}
          </p>
        ) : null}
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
