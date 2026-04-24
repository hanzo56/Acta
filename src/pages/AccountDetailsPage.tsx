import type { FormEvent } from 'react'

import { ProfileSubpageHeader } from '../components/ProfileSubpageHeader'

const EMAIL_DEFAULT = 'julian.thorne@acta.ai'

function LabeledInput({
  label,
  name,
  placeholder,
  type = 'text',
  defaultValue = '',
  autoComplete,
}: {
  label: string
  name: string
  placeholder: string
  type?: string
  defaultValue?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[12px] font-semibold leading-[18px] text-[#bbcabf]"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-[50px] w-full rounded-xl border border-[rgba(60,74,66,0.2)] bg-[#0e0e0e] px-4 text-[16px] font-normal text-[#e5e2e1] shadow-none outline-none placeholder:text-[#3c4a42] focus:border-[rgba(78,222,163,0.45)] focus:ring-1 focus:ring-[#4edea3]"
      />
    </div>
  )
}

export function AccountDetailsPage() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <ProfileSubpageHeader title="Account Details" />

      <main className="acta-main acta-main--inset-top w-full max-w-[672px] px-6 pb-12">
        <div className="flex flex-col gap-8 pt-2">
          <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
            <h2 className="px-6 pt-5 text-center text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
              Email address
            </h2>
            <div className="px-6 pb-6 pt-3">
              <div className="h-[50px] w-full rounded-xl border border-[rgba(60,74,66,0.2)] bg-[#0e0e0e] px-4 py-3">
                <p className="text-[16px] font-normal leading-6 text-[#e5e2e1]">
                  {EMAIL_DEFAULT}
                </p>
              </div>
              <p className="mt-3 text-[12px] font-normal leading-4 text-[#bbcabf]">
                This email is used for account recovery and notifications
              </p>
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 overflow-hidden rounded-3xl bg-[#1c1b1b] px-6 py-4"
          >
            <h2 className="py-1 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
              Change password
            </h2>
            <div className="flex flex-col gap-3 pt-2">
              <LabeledInput
                name="current"
                label="Current Password"
                placeholder="Enter current password"
                type="password"
                autoComplete="current-password"
              />
              <LabeledInput
                name="new"
                label="New Password"
                placeholder="Enter new password"
                type="password"
                autoComplete="new-password"
              />
              <LabeledInput
                name="confirm"
                label="Confirm New Password"
                placeholder="Confirm new password"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[#4edea3] py-3 text-center text-[16px] font-semibold leading-6 text-[#00422b] transition hover:bg-[#5fe8b3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1b1b]"
            >
              Update Password
            </button>
          </form>

          <section className="overflow-hidden rounded-3xl bg-[#1c1b1b]">
            <h2 className="px-6 py-4 text-[11px] font-extrabold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf] opacity-60">
              Account info
            </h2>
            <div className="flex items-center justify-between border-t border-[rgba(60,74,66,0.05)] px-6 py-3">
              <span className="text-[14px] font-normal leading-[21px] text-[#bbcabf]">
                Account Created
              </span>
              <span className="text-[14px] font-semibold leading-[21px] text-[#e5e2e1]">
                March 15, 2024
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[rgba(60,74,66,0.05)] px-6 py-3 pb-6">
              <span className="text-[14px] font-normal leading-[21px] text-[#bbcabf]">
                User ID
              </span>
              <span className="text-[14px] font-semibold leading-[21px] text-[#e5e2e1]">
                USR-4829
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
