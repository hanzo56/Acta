import { useCallback, useEffect, useState } from 'react'

import { AppBottomNav } from '../components/AppBottomNav'
import { readPhoneUpdateComplete, writePhoneUpdateComplete } from '../phoneUpdateStorage'

const imgUserProfile =
  'https://www.figma.com/api/mcp/asset/62a50c2d-ed0c-46b1-a196-24ef5cc6c4b9'
const imgSearchBtn =
  'https://www.figma.com/api/mcp/asset/9267dc38-be11-43d8-a9fc-c1a80d0c5152'
const imgMessages =
  'https://www.figma.com/api/mcp/asset/48e0d446-cdf9-4c63-a566-1ce2d114f799'
const imgBell =
  'https://www.figma.com/api/mcp/asset/bd5c3338-25a3-499b-a65d-d8517347f191'
const imgCheck =
  'https://www.figma.com/api/mcp/asset/6f9c5a7b-b87d-4bc7-bd68-74cb75e6ae98'
const imgEllipsis =
  'https://www.figma.com/api/mcp/asset/adf72b64-0fc3-4174-a5f2-a3b2ff753fbe'

const STEP_LOAD_MS = 2200

type StepStatus = 'pending' | 'loading' | 'done'

const AUTO_STEPS = [
  {
    title: 'Removed 25 spam emails from your inbox',
    icon: imgMessages,
    iconSize: 'size-5' as const,
  },
  {
    title: 'Blocked 5 spam calls and silenced repeat robocallers',
    icon: imgBell,
    iconSize: 'h-5 w-5' as const,
  },
  {
    title: 'Voicemail — your mother asked you to call her back when you get a chance',
    icon: imgMessages,
    iconSize: 'size-5' as const,
  },
  {
    title:
      'Arcadia High School — your daughter is not feeling well; please pick her up as soon as possible',
    icon: imgBell,
    iconSize: 'h-5 w-5' as const,
  },
] as const

function formatStepCompletedTime(ms: number) {
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

function initialStepStatuses(skipAnimation: boolean): StepStatus[] {
  if (skipAnimation) return AUTO_STEPS.map(() => 'done')
  return AUTO_STEPS.map((_, i) => (i === 0 ? 'loading' : 'pending'))
}

function initialStepCompletedAt(skipAnimation: boolean): (number | null)[] {
  if (!skipAnimation) return AUTO_STEPS.map(() => null)
  const now = Date.now()
  return AUTO_STEPS.map((_, i) => now - (AUTO_STEPS.length - 1 - i) * STEP_LOAD_MS)
}

export function PhoneUpdateGraphPage() {
  const oooDoneInitially = readPhoneUpdateComplete()
  const [oooSent, setOooSent] = useState(oooDoneInitially)
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(() =>
    initialStepStatuses(oooDoneInitially),
  )
  const [stepCompletedAt, setStepCompletedAt] = useState<(number | null)[]>(() =>
    initialStepCompletedAt(oooDoneInitially),
  )
  const [showOooSection, setShowOooSection] = useState(oooDoneInitially)
  const [clockNowMs, setClockNowMs] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setClockNowMs(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (oooDoneInitially) return

    const timeouts: ReturnType<typeof setTimeout>[] = []

    const advance = (index: number) => {
      if (index >= AUTO_STEPS.length) {
        setShowOooSection(true)
        return
      }
      timeouts.push(
        setTimeout(() => {
          const completedAt = Date.now()
          setStepStatuses((prev) => {
            const next = [...prev] as StepStatus[]
            next[index] = 'done'
            if (index + 1 < AUTO_STEPS.length) {
              next[index + 1] = 'loading'
            }
            return next
          })
          setStepCompletedAt((prev) => {
            const next = [...prev]
            next[index] = completedAt
            return next
          })
          advance(index + 1)
        }, STEP_LOAD_MS),
      )
    }

    advance(0)

    return () => timeouts.forEach(clearTimeout)
  }, [oooDoneInitially])

  const handleApproveOoo = useCallback(() => {
    writePhoneUpdateComplete()
    setOooSent(true)
  }, [])

  const autoAllDone = stepStatuses.length > 0 && stepStatuses.every((s) => s === 'done')

  const headerStatus = oooSent ? 'Complete' : autoAllDone ? 'Review' : 'Running'

  const doneSubtitleForStep = (i: number) => {
    const t = stepCompletedAt[i]
    return t != null ? formatStepCompletedTime(t) : ''
  }

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Phone activity graph">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">
              {headerStatus}
            </p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Phone activity summary
            </h1>
            <p className="pt-1 text-[14px] font-normal leading-5 text-[#bbcabf]">
              Here’s what I found from your recent calls, messages, and notifications.
            </p>
          </header>

          <section aria-label="Activity sequence">
            <h2 className="mb-4 px-0.5 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
              Activity timeline
            </h2>
            <ul className="flex flex-col gap-4">
              {AUTO_STEPS.map((step, i) => (
                <PhoneGraphStepRow
                  key={step.title}
                  title={step.title}
                  icon={step.icon}
                  iconSizeClass={step.iconSize}
                  status={stepStatuses[i] ?? 'pending'}
                  doneSubtitle={doneSubtitleForStep(i)}
                  loadingClock={
                    (stepStatuses[i] ?? 'pending') === 'loading'
                      ? formatStepCompletedTime(clockNowMs)
                      : undefined
                  }
                />
              ))}
            </ul>
          </section>

          {showOooSection ? (
            <section
              className="rounded-2xl border border-[rgba(78,222,163,0.25)] bg-[rgba(78,222,163,0.06)] p-6"
              aria-label="Out of office approval"
            >
              <p className="text-[16px] font-medium leading-6 text-[#e5e2e1]">
                Shall I send an email to your team informing them you will be out of office?
              </p>
              {!oooSent ? (
                <>
                  <p className="mt-2 text-[13px] leading-5 text-[rgba(187,202,191,0.75)]">
                    Pending your approval — nothing will be sent until you confirm.
                  </p>
                  <button
                    type="button"
                    onClick={handleApproveOoo}
                    className="mt-6 w-full rounded-xl bg-[#4edea3] py-4 text-[15px] font-bold leading-5 text-[#00422b] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.15)] transition hover:bg-[#5fe8b3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
                  >
                    Approve &amp; send email
                  </button>
                </>
              ) : (
                <div className="mt-4 rounded-xl border border-[rgba(78,222,163,0.35)] bg-[#131313] px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#4edea3]">Sent</p>
                  <p className="mt-1 text-[14px] leading-5 text-[#bbcabf]">
                    Out-of-office notice emailed to your team distribution list.
                  </p>
                </div>
              )}
            </section>
          ) : null}
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

function PhoneGraphStepRow({
  title,
  icon,
  iconSizeClass,
  status,
  doneSubtitle,
  loadingClock,
}: {
  title: string
  icon: string
  iconSizeClass: string
  status: StepStatus
  doneSubtitle: string
  loadingClock?: string
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
            IN PROGRESS · {loadingClock ?? '—'}
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
