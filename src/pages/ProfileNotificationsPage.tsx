import { useState } from 'react'

import { ActaSettingsToggle } from '../components/ActaSettingsToggle'
import { ProfileSubpageHeader } from '../components/ProfileSubpageHeader'

type ToggleRowProps = {
  title: string
  subtitle: string
  on: boolean
  onChange: (v: boolean) => void
  borderTop?: boolean
  py?: 'normal' | 'tight'
}

function ToggleRow({
  title,
  subtitle,
  on,
  onChange,
  borderTop,
  py = 'normal',
}: ToggleRowProps) {
  const y = py === 'tight' ? 'py-[21px]' : 'py-5'
  return (
    <div
      className={`flex items-center justify-between gap-3 px-6 ${y} ${
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

export function ProfileNotificationsPage() {
  const [task, setTask] = useState(true)
  const [agent, setAgent] = useState(true)
  const [system, setSystem] = useState(true)
  const [email, setEmail] = useState(false)
  const [sounds, setSounds] = useState(true)
  const [haptics, setHaptics] = useState(true)

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <ProfileSubpageHeader title="Notifications" />

      <main className="acta-main acta-main--inset-top w-full max-w-[672px] space-y-8 px-0 pb-12">
        <div className="px-6 pt-2">
          <section className="overflow-hidden rounded-3xl bg-[#1c1b1b] px-3">
            <h2 className="px-3 pb-0 pt-4 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
              Push notifications
            </h2>
            <ToggleRow
              title="Task Completions"
              subtitle="When agents complete tasks"
              on={task}
              onChange={setTask}
            />
            <ToggleRow
              title="Agent Updates"
              subtitle="Progress and status changes"
              on={agent}
              onChange={setAgent}
              borderTop
            />
            <ToggleRow
              title="System Alerts"
              subtitle="Important system messages"
              on={system}
              onChange={setSystem}
              borderTop
            />
            <ToggleRow
              title="Email Notifications"
              subtitle="Receive updates via email"
              on={email}
              onChange={setEmail}
              borderTop
              py="tight"
            />
          </section>
        </div>

        <div className="px-6">
          <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
            <h2 className="px-6 pb-0 pt-5 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
              Sounds &amp; haptics
            </h2>
            <ToggleRow
              title="Notification Sounds"
              subtitle="Play sound for notifications"
              on={sounds}
              onChange={setSounds}
            />
            <ToggleRow
              title="Vibration"
              subtitle="Haptic feedback on alerts"
              on={haptics}
              onChange={setHaptics}
              borderTop
              py="tight"
            />
          </section>
        </div>

        <div className="px-6">
          <section className="space-y-4 overflow-hidden rounded-3xl bg-[#1c1b1b] p-4 px-6 pb-5">
            <h2 className="text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
              Do not disturb
            </h2>
            <p className="text-[14px] font-normal leading-5 text-[#bbcabf]">
              Schedule quiet hours when notifications will be silenced
            </p>
            <button
              type="button"
              className="w-full rounded-xl border border-[rgba(60,74,66,0.1)] bg-[#201f1f] py-[13px] text-center text-[14px] font-semibold leading-5 text-[#e5e2e1] transition hover:bg-[#2a2929] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
            >
              Configure Schedule
            </button>
          </section>
        </div>
      </main>
    </div>
  )
}
