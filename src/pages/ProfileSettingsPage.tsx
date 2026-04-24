import { useState, type ReactNode } from 'react'

import { AppBottomNav } from '../components/AppBottomNav'
import {
  ICON_ACCOUNT as imgAccountDetails,
  ICON_AGENT_INSIGHTS as imgAgentInsights,
  ICON_BELL as imgNotifications,
  ICON_CHEVRON_RIGHT as imgChevron,
  ICON_PRIVACY as imgPrivacy,
  ICON_PROFILE_RING_BADGE as imgBackgroundBorder,
  ICON_SEARCH as imgSearch,
  ICON_SIGN_OUT as imgSignOut,
  ICON_SUBSCRIPTION as imgSubscription,
  ICON_USER_AVATAR,
} from '../assets/actaIconUrls'

const imgUserProfilePhoto = ICON_USER_AVATAR
const imgUserProfile = ICON_USER_AVATAR

function SettingsRow({
  icon,
  iconClassName,
  title,
  subtitle,
  trailing,
  borderTop,
}: {
  icon: string
  iconClassName?: string
  title: string
  subtitle: string
  trailing?: ReactNode
  borderTop?: boolean
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between gap-3 px-6 py-5 text-left transition-colors hover:bg-[rgba(255,255,255,0.02)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4edea3] ${
        borderTop ? 'border-t border-[rgba(60,74,66,0.05)]' : ''
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#353534]">
          <div className={`relative shrink-0 ${iconClassName ?? 'size-4'}`}>
            <img alt="" className="absolute inset-0 size-full max-w-none object-contain" src={icon} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-semibold leading-6 text-[#e5e2e1]">{title}</p>
          <p className="text-[12px] font-normal leading-4 text-[#bbcabf]">{subtitle}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {trailing}
        <div className="relative h-3 w-[7.4px]">
          <img alt="" className="absolute inset-0 size-full max-w-none" src={imgChevron} />
        </div>
      </div>
    </button>
  )
}

export function ProfileSettingsPage() {
  const [agentInsightsEnabled, setAgentInsightsEnabled] = useState(true)

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <header className="acta-header-fixed z-10 flex h-16 items-center justify-between bg-[#131313] px-6">
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 overflow-hidden rounded-full border border-[rgba(60,74,66,0.2)] bg-[#201f1f] p-px">
            <img alt="" className="size-full object-cover" src={imgUserProfilePhoto} />
          </div>
          <span className="text-[24px] font-bold leading-8 tracking-[-0.6px]">Acta</span>
        </div>
        <button type="button" className="rounded-full p-2" aria-label="Search">
          <img alt="" className="size-[18px]" src={imgSearch} />
        </button>
      </header>

      <main className="acta-main acta-main--inset-both max-w-[672px] px-6 pb-10">
        <div className="flex flex-col gap-12 pt-2">
          <section className="flex flex-col items-center" aria-labelledby="profile-name">
            <div className="relative">
              <div
                className="rounded-full p-1"
                style={{
                  backgroundImage: 'linear-gradient(45deg, rgb(78, 222, 163) 0%, rgb(208, 188, 255) 100%)',
                }}
              >
                <div className="size-24 overflow-hidden rounded-full bg-[#0e0e0e]">
                  <img alt="" className="size-full object-cover" src={imgUserProfile} />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-0.5 -right-0.5 size-[34px]">
                <img alt="" className="size-full max-w-none" src={imgBackgroundBorder} />
              </div>
            </div>
            <h1 id="profile-name" className="mt-6 text-center text-[30px] font-extrabold leading-9 tracking-[-1.5px]">
              Julian Thorne
            </h1>
            <p className="mt-1 text-center text-[14px] font-medium uppercase leading-5 tracking-[0.35px] text-[#bbcabf]/80">
              JULIAN.THORNE@ACTA.AI
            </p>
            <button
              type="button"
              className="mt-6 rounded-xl border border-[rgba(60,74,66,0.1)] bg-[#201f1f] px-[25px] py-2.5 text-[14px] font-semibold leading-5 text-[#e5e2e1] transition-colors hover:bg-[#2a2929] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
            >
              Edit Profile
            </button>
          </section>

          <div className="flex flex-col gap-4">
            <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
              <div className="px-6 py-4">
                <h2 className="text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]/60">
                  Account settings
                </h2>
              </div>
              <SettingsRow
                icon={imgAccountDetails}
                title="Account Details"
                subtitle="Update password and email"
              />
              <SettingsRow
                icon={imgSubscription}
                iconClassName="h-4 w-5"
                title="Subscription"
                subtitle="Manage your Pro plan"
                borderTop
                trailing={
                  <span className="rounded-md bg-[rgba(78,222,163,0.1)] px-2 py-0.5 text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#4edea3]">
                    Active
                  </span>
                }
              />
            </section>

            <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
              <div className="px-6 py-4">
                <h2 className="text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]/60">
                  Preferences
                </h2>
              </div>
              <SettingsRow
                icon={imgNotifications}
                iconClassName="h-5 w-4"
                title="Notifications"
                subtitle="Manage alerts and sounds"
              />
              <SettingsRow
                icon={imgPrivacy}
                iconClassName="h-[15px] w-[22px]"
                title="Privacy"
                subtitle="Control visibility and data"
                borderTop
              />
            </section>

            <section
              className="relative overflow-hidden rounded-3xl border border-[rgba(60,74,66,0.1)] p-8"
              style={{
                backgroundImage: 'linear-gradient(150.69deg, rgb(32, 31, 31) 0%, rgb(28, 27, 27) 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[rgba(208,188,255,0.1)] blur-[32px]"
                aria-hidden
              />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative size-[22px] shrink-0">
                    <img alt="" className="absolute inset-0 size-full max-w-none" src={imgAgentInsights} />
                  </div>
                  <p className="text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#d0bcff]">
                    Agent insights
                  </p>
                </div>
                <h3 className="text-[20px] font-bold leading-7 tracking-[-0.5px]">Personalized Experience</h3>
                <p className="max-w-[320px] text-[14px] font-normal leading-5 text-[#bbcabf]">
                  Allow Acta to learn from your habits for more precise agentic task execution.
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-[12px] font-bold uppercase leading-4 tracking-[-0.6px] text-[#bbcabf]">
                    {agentInsightsEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={agentInsightsEnabled}
                    onClick={() => setAgentInsightsEnabled((v) => !v)}
                    className={`relative h-6 w-12 shrink-0 rounded-full p-1 shadow-[0px_0px_15px_0px_rgba(78,222,163,0.3)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1b1b] ${
                      agentInsightsEnabled ? 'bg-[#4edea3]' : 'bg-[#353534]'
                    }`}
                  >
                    <span
                      className={`block size-4 rounded-full transition-transform ${
                        agentInsightsEnabled
                          ? 'translate-x-6 bg-[#00422b]'
                          : 'translate-x-0 bg-[#bbcabf]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-6 pt-2">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(255,180,171,0.2)] bg-[#0e0e0e] px-6 py-[17px] text-[16px] font-semibold leading-6 text-[#ffb4ab] transition-colors hover:bg-[rgba(255,180,171,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb4ab]"
              >
                <div className="relative size-[10.5px]">
                  <img alt="" className="absolute inset-0 size-full max-w-none" src={imgSignOut} />
                </div>
                Sign Out of Acta
              </button>
              <p className="text-center text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[rgba(187,202,191,0.4)]">
                App version 2.4.0 (stable)
              </p>
            </div>
          </div>
        </div>
      </main>

      <AppBottomNav settingsIconSrc="/nav-settings-active.png" largeSettingsIcon />
    </div>
  )
}
