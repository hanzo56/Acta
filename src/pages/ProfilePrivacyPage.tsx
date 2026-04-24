import { useState } from 'react'

import { ICON_CHEVRON_RIGHT, ICON_CHEVRON_RIGHT_SALMON } from '../assets/actaIconUrls'
import { ActaSettingsToggle } from '../components/ActaSettingsToggle'
import { ProfileSubpageHeader } from '../components/ProfileSubpageHeader'

const imgChevron = ICON_CHEVRON_RIGHT
const imgChevronPink = ICON_CHEVRON_RIGHT_SALMON

type ToggleRowProps = {
  title: string
  subtitle: string
  on: boolean
  onChange: (v: boolean) => void
  borderTop?: boolean
}

function ToggleRow({ title, subtitle, on, onChange, borderTop }: ToggleRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-6 py-5 ${
        borderTop ? 'border-t border-[rgba(60,74,66,0.05)]' : ''
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">{title}</p>
        <p className="text-[12px] font-normal leading-4 text-[#bbcabf]">{subtitle}</p>
      </div>
      <ActaSettingsToggle enabled={on} onChange={onChange} />
    </div>
  )
}

export function ProfilePrivacyPage() {
  const [publicProfile, setPublicProfile] = useState(true)
  const [activity, setActivity] = useState(true)
  const [usageData, setUsageData] = useState(true)
  const [analytics, setAnalytics] = useState(true)

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <ProfileSubpageHeader title="Privacy" />

      <main className="acta-main acta-main--inset-top w-full max-w-[672px] space-y-8 px-6 pb-12">
        <div className="pt-2" />

        <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
          <h2 className="px-6 pb-0 pt-5 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
            Profile visibility
          </h2>
          <ToggleRow
            title="Public Profile"
            subtitle="Make profile visible to others"
            on={publicProfile}
            onChange={setPublicProfile}
          />
          <ToggleRow
            title="Activity Status"
            subtitle="Show when you're online"
            on={activity}
            onChange={setActivity}
            borderTop
          />
        </section>

        <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
          <h2 className="px-6 pb-0 pt-5 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
            Data &amp; analytics
          </h2>
          <ToggleRow
            title="Usage Data Collection"
            subtitle="Help improve Acta with usage data"
            on={usageData}
            onChange={setUsageData}
          />
          <ToggleRow
            title="Analytics"
            subtitle="Track app performance metrics"
            on={analytics}
            onChange={setAnalytics}
            borderTop
          />
        </section>

        <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
          <h2 className="px-6 pb-0 pt-5 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
            Data management
          </h2>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left transition hover:bg-[rgba(255,255,255,0.02)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4edea3]"
          >
            <div>
              <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">
                Download My Data
              </p>
              <p className="text-[12px] font-normal leading-4 text-[#bbcabf]">
                Export all your personal data
              </p>
            </div>
            <div className="size-3 shrink-0">
              <img alt="" className="size-full" src={imgChevron} />
            </div>
          </button>
          <div className="border-t border-[rgba(60,74,66,0.05)]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-6 pb-6 pt-5 text-left transition hover:bg-[rgba(255,255,255,0.02)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4edea3]"
            >
              <div>
                <p className="text-[16px] font-semibold leading-6 text-[#ffb4ab]">
                  Delete My Account
                </p>
                <p className="text-[12px] font-normal leading-4 text-[#bbcabf]">
                  Permanently remove all data
                </p>
              </div>
              <div className="size-3 shrink-0">
                <img alt="" className="size-full" src={imgChevronPink} />
              </div>
            </button>
          </div>
        </section>

        <section className="space-y-4 overflow-hidden rounded-3xl bg-[#1c1b1b] p-6">
          <h2 className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">
            Privacy Policy
          </h2>
          <p className="text-[14px] font-normal leading-5 text-[#bbcabf]">
            Learn how we collect, use, and protect your personal information.
          </p>
          <button
            type="button"
            className="w-full rounded-xl border border-[rgba(60,74,66,0.1)] bg-[#201f1f] py-[13px] text-center text-[14px] font-semibold leading-5 text-[#e5e2e1] transition hover:bg-[#2a2929] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
          >
            Read Privacy Policy
          </button>
        </section>
      </main>
    </div>
  )
}
