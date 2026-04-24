import { ActaHeaderLogo } from '../components/ActaHeaderLogo'
import { AppBottomNav } from '../components/AppBottomNav'
import {
  ICON_CALENDAR as imgCalendar,
  ICON_CHECK as imgCheck,
  ICON_MESSAGES as imgMessages,
} from '../assets/actaIconUrls'

const CONFIRMED_PARTNERS = [
  { name: 'Morgan Chen', firm: 'Horizon Ventures' },
  { name: 'Alex Rivera', firm: 'Catalyst Fund' },
  { name: 'Jordan Kim', firm: 'Northstar Capital' },
  { name: 'Sam Patel', firm: 'Meridian Partners' },
  { name: 'Riley Brooks', firm: 'Foundry Collective' },
] as const

const EMAIL_EXCERPTS = [
  {
    from: 'Morgan Chen',
    firm: 'Horizon Ventures',
    subject: 'Re: Briefing — time confirmed',
    body: 'Thanks — the slot a week from today works on my end. Please send the deck and data room link beforehand so our partners can review. Looking forward to it.',
  },
  {
    from: 'Alex Rivera',
    firm: 'Catalyst Fund',
    subject: 'Confirmed — investor sync',
    body: "Confirmed for the proposed window. We're aligned on agenda items and will have our associate join for the first half. Excited to dig into the roadmap.",
  },
] as const

const STEPS = [
  {
    title: 'Pulled your top 5 venture partners from the pipeline CRM',
    icon: imgMessages,
    iconSize: 'size-5' as const,
    doneDetail: '09:14:02 AM',
  },
  {
    title: 'Sent scheduling requests with three optional time windows',
    icon: imgCalendar,
    iconSize: 'h-5 w-[18px]' as const,
    doneDetail: '09:14:18 AM',
  },
  {
    title: 'Received 5/5 confirmations — all partners accepted a slot',
    icon: imgMessages,
    iconSize: 'size-5' as const,
    doneDetail: 'All accepted',
  },
  {
    title: 'Locked the shared briefing window one week from today',
    icon: imgCalendar,
    iconSize: 'h-5 w-[18px]' as const,
    doneDetail: 'Calendar synced',
  },
  {
    title: 'Archived email replies and attached notes to each contact',
    icon: imgMessages,
    iconSize: 'size-5' as const,
    doneDetail: 'Synced',
  },
] as const

function weekFromTodayLabel() {
  const t = new Date()
  t.setDate(t.getDate() + 7)
  return t.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function InvestorCallsGraphPage() {
  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Investor calls graph">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">Complete</p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Schedule investor calls
            </h1>
            <div className="pt-1">
              <p className="text-[14px] font-normal leading-5 text-[#bbcabf]">
                Coordination finished — every partner confirmed for the upcoming briefing.
              </p>
            </div>
          </header>

          <ul className="flex flex-col gap-4">
            {STEPS.map((step) => (
              <InvestorGraphStepRow
                key={step.title}
                title={step.title}
                icon={step.icon}
                iconSizeClass={step.iconSize}
                doneSubtitle={step.doneDetail}
              />
            ))}
          </ul>

          <section
            className="overflow-hidden rounded-2xl border border-[rgba(60,74,66,0.15)] bg-[#1c1b1b]"
            aria-label="Confirmed meetings"
          >
            <div className="border-b border-[rgba(60,74,66,0.1)] bg-[rgba(78,222,163,0.06)] px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[rgba(78,222,163,0.12)]">
                  <img alt="" className="h-5 w-[18px] object-contain" src={imgCalendar} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#bbcabf]">
                    Briefing window
                  </p>
                  <p className="text-[14px] font-medium leading-5 text-[#4edea3]">5 partners confirmed</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 px-5 py-5">
              <p className="text-[14px] leading-5 text-[#bbcabf]">
                Shared slot: <span className="font-medium text-[#e5e2e1]">{weekFromTodayLabel()}</span>{' '}
                (one week from today)
              </p>
              <ul className="flex flex-col gap-3">
                {CONFIRMED_PARTNERS.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[rgba(60,74,66,0.12)] bg-[#131313] px-4 py-3"
                  >
                    <div>
                      <p className="text-[15px] font-medium leading-5 text-[#e5e2e1]">{p.name}</p>
                      <p className="mt-0.5 text-[12px] leading-4 text-[rgba(187,202,191,0.65)]">{p.firm}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.6px] text-[#4edea3]">
                      Confirmed
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-3" aria-label="Email reply excerpts">
            <h2 className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
              Reply excerpts
            </h2>
            <div className="flex flex-col gap-4">
              {EMAIL_EXCERPTS.map((mail) => (
                <article
                  key={mail.from}
                  className="rounded-2xl border border-[rgba(60,74,66,0.12)] bg-[#1c1b1b] p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[rgba(60,74,66,0.1)] pb-3">
                    <div>
                      <p className="text-[14px] font-semibold text-[#e5e2e1]">{mail.from}</p>
                      <p className="text-[12px] text-[rgba(187,202,191,0.65)]">{mail.firm}</p>
                    </div>
                    <p className="text-[11px] text-[rgba(187,202,191,0.55)]">{mail.subject}</p>
                  </div>
                  <p className="mt-4 text-[14px] leading-[22px] text-[#bbcabf]">{mail.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <header className="acta-header-fixed flex h-16 items-center justify-start bg-[#131313] px-6">
        <ActaHeaderLogo />
      </header>

      <AppBottomNav />
    </div>
  )
}

function InvestorGraphStepRow({
  title,
  icon,
  iconSizeClass,
  doneSubtitle,
}: {
  title: string
  icon: string
  iconSizeClass: string
  doneSubtitle: string
}) {
  return (
    <li className="flex items-start gap-4 py-1">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1c1b1b]">
        <img alt="" className={`${iconSizeClass} object-contain`} src={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] leading-snug text-[#e5e2e1]">{title}</p>
        <p className="mt-0.5 text-[11px] uppercase leading-[16.5px] text-[rgba(187,202,191,0.7)]">
          {doneSubtitle}
        </p>
      </div>
      <div className="flex size-[20px] shrink-0 items-center justify-center pt-0.5">
        <img alt="" className="size-[16.67px]" src={imgCheck} />
      </div>
    </li>
  )
}
