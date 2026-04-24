import { ICON_CHEVRON_RIGHT_SALMON, ICON_CHECK, ICON_SPARKLE } from '../assets/actaIconUrls'
import { ProfileSubpageHeader } from '../components/ProfileSubpageHeader'

const imgCheck = ICON_CHECK
const imgChevronSalmon = ICON_CHEVRON_RIGHT_SALMON
const imgSparkle = ICON_SPARKLE

const features = [
  'Unlimited AI agent tasks',
  'Priority task execution',
  'Advanced personalization',
  'Premium support',
] as const

export function ProfileSubscriptionPage() {
  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <ProfileSubpageHeader title="Subscription" />

      <main className="acta-main acta-main--inset-top w-full max-w-[672px] space-y-8 px-6 pb-12">
        <div className="pt-2" />

        <section
          className="overflow-hidden rounded-3xl border border-[rgba(60,74,66,0.08)] p-6"
          style={{
            backgroundImage:
              'linear-gradient(151.7deg, rgb(32, 31, 31) 7.88%, rgb(28, 27, 27) 92.12%)',
          }}
        >
          <div className="flex items-start gap-2.5">
            <div className="relative size-[22px] shrink-0">
              <img alt="" className="size-full object-contain" src={imgSparkle} />
            </div>
            <p className="text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#4edea3]">
              Pro plan
            </p>
          </div>
          <p className="mt-2.5 text-[14px] font-normal leading-5 text-[#bbcabf]">
            Full access to AI agents, unlimited tasks, and premium features
          </p>
          <div className="mt-3 inline-flex h-9 items-center rounded-xl bg-[rgba(78,222,163,0.1)] px-3">
            <span className="text-[14px] font-bold uppercase leading-5 tracking-[0.5px] text-[#4edea3]">
              Active subscription
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[36px] font-extrabold leading-10 tracking-[-1.8px] text-[#e5e2e1]">
              $24.99
            </span>
            <span className="text-[16px] font-normal text-[#bbcabf]">/ month</span>
          </div>
          <ul className="mt-3 flex list-none flex-col gap-3">
            {features.map((line) => (
              <li key={line} className="flex items-center gap-3">
                <div className="size-4 shrink-0">
                  <img alt="" className="size-full" src={imgCheck} />
                </div>
                <span className="text-[14px] font-normal leading-5 text-[#e5e2e1]">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 overflow-hidden rounded-3xl bg-[#1c1b1b] px-6 py-4">
          <h2 className="text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
            Billing
          </h2>
          <div className="flex items-center justify-between py-3">
            <span className="text-[14px] font-normal text-[#bbcabf]">Next billing date</span>
            <span className="text-[14px] font-semibold text-[#e5e2e1]">May 15, 2026</span>
          </div>
          <div className="flex items-center justify-between border-t border-[rgba(60,74,66,0.05)] py-3">
            <span className="text-[14px] font-normal text-[#bbcabf]">Payment method</span>
            <span className="text-[14px] font-semibold text-[#e5e2e1]">•••• 4242</span>
          </div>
          <button
            type="button"
            className="w-full rounded-xl border border-[rgba(60,74,66,0.1)] bg-[#201f1f] py-[13px] text-center text-[14px] font-semibold text-[#e5e2e1] transition hover:bg-[#2a2929] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
          >
            Update Payment Method
          </button>
        </section>

        <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
          <button
            type="button"
            className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-[rgba(255,255,255,0.02)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4edea3]"
          >
            <span className="text-[16px] font-semibold text-[#ffb4ab]">
              Cancel Subscription
            </span>
            <div className="size-3 shrink-0">
              <img alt="" className="size-full" src={imgChevronSalmon} />
            </div>
          </button>
        </section>
      </main>
    </div>
  )
}
