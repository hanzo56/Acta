import { useState } from 'react'

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

export function PhoneUpdateGraphPage() {
  const [oooSent, setOooSent] = useState(() => readPhoneUpdateComplete())

  const handleApproveOoo = () => {
    writePhoneUpdateComplete()
    setOooSent(true)
  }

  return (
    <div className="acta-shell text-[#e5e2e1]">
      <main className="acta-graph-body" aria-label="Phone activity graph">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-8 px-6 pb-[max(2rem,calc(1.25rem+env(safe-area-inset-bottom,0px)))]">
          <header className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 tracking-[0.35px] text-[#4edea3]">
              {oooSent ? 'Complete' : 'Review'}
            </p>
            <h1 className="text-[30px] font-normal leading-9 tracking-[-0.75px] text-[#e5e2e1]">
              Phone activity summary
            </h1>
            <p className="pt-1 text-[14px] font-normal leading-5 text-[#bbcabf]">
              Here’s what I found from your recent calls, messages, and notifications.
            </p>
          </header>

          <section
            className="rounded-2xl border border-[rgba(60,74,66,0.15)] bg-[#1c1b1b] p-6"
            aria-label="Activity results"
          >
            <h2 className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
              Actions taken
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-[15px] leading-6 text-[#e5e2e1]">
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#4edea3]" aria-hidden />
                <span>Removed <strong className="font-semibold">25</strong> spam emails from your inbox.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#4edea3]" aria-hidden />
                <span>
                  Blocked <strong className="font-semibold">5</strong> spam calls and silenced repeat robocallers.
                </span>
              </li>
            </ul>
          </section>

          <section
            className="rounded-2xl border border-[rgba(60,74,66,0.15)] bg-[#1c1b1b] p-6"
            aria-label="Voicemail and calls"
          >
            <h2 className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
              Voicemail &amp; calls
            </h2>
            <ul className="mt-4 flex flex-col gap-6">
              <li className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#201f1f]">
                  <img alt="" className="size-5 object-contain" src={imgMessages} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">Voicemail — your mother</p>
                  <p className="mt-1 text-[15px] leading-6 text-[#bbcabf]">
                    She asked you to call her back when you get a chance.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#201f1f]">
                  <img alt="" className="h-5 w-5 object-contain" src={imgBell} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">
                    Arcadia High School
                  </p>
                  <p className="mt-1 text-[15px] leading-6 text-[#bbcabf]">
                    Regarding your daughter — she is not feeling well. Please come pick her up as soon as
                    possible.
                  </p>
                </div>
              </li>
            </ul>
          </section>

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
