import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgMessages =
  'https://www.figma.com/api/mcp/asset/13775fd3-f434-43fb-9d63-13b1f713525a'

const STAGGER_MS = 2800
const SECTION_COUNT = 3

export function PhoneUpdatePreviewPage() {
  const navigate = useNavigate()
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = []
    for (let i = 1; i < SECTION_COUNT; i++) {
      ids.push(
        window.setTimeout(() => {
          setVisibleCount((c) => Math.max(c, i + 1))
        }, i * STAGGER_MS),
      )
    }
    return () => ids.forEach(clearTimeout)
  }, [])

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <main className="acta-main acta-main--inset-preview flex w-full max-w-[672px] flex-col gap-12 px-6">
        {visibleCount >= 1 ? (
          <header className="acta-preview-reveal flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[2px] text-[#bbcabf]">
              PREVIEW
            </p>
            <h1 className="pt-1 text-[36px] font-bold leading-10 tracking-[-0.9px] text-[#e5e2e1]">
              Phone activity update
            </h1>
            <p className="text-[16px] font-normal leading-6 text-[#bbcabf]">
              I’ll check for recent activities on your phone — messages, calls, voicemails, and school
              notifications — then prepare a summary you can review before I take any action.
            </p>
          </header>
        ) : null}

        {visibleCount >= 2 ? (
          <section className="relative">
            <div
              className="absolute bottom-8 left-6 top-8 w-px bg-[rgba(60,74,66,0.2)]"
              aria-hidden
            />
            <div className="acta-preview-reveal">
              <TimelineStep
                title="Device scan"
                body={
                  <>
                    Read recent SMS, call logs, voicemail transcriptions,
                    <br />
                    and priority caller IDs from the last 48 hours.
                  </>
                }
                tag="SCOPE:"
                value="This device"
                icon={imgMessages}
              />
            </div>
          </section>
        ) : null}
      </main>

      {visibleCount >= 3 ? (
        <div className="acta-preview-footer-fixed bg-[rgba(19,19,19,0.8)] px-6 pb-12 pt-6 backdrop-blur-[20px]">
          <button
            type="button"
            onClick={() =>
              navigate('/graph/phone-update', { state: { fromPhoneUpdatePreview: true } })
            }
            className="acta-preview-reveal relative w-full rounded-2xl bg-[#4edea3] py-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
          >
            <span className="text-[16px] font-bold leading-6 text-[#00422b]">Approve</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

function TimelineStep({
  title,
  body,
  tag,
  value,
  icon,
}: {
  title: string
  body: ReactNode
  tag: string
  value: string
  icon: string
}) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-[rgba(60,74,66,0.1)] bg-[#201f1f] p-px">
        <div className="relative size-[16.67px]">
          <img alt="" className="absolute inset-0 size-full max-w-none object-contain" src={icon} />
        </div>
      </div>
      <h3 className="text-[18px] font-bold leading-7 text-[#e5e2e1]">{title}</h3>
      <div className="pb-3 text-[16px] font-normal leading-6 text-[#bbcabf]">{body}</div>
      <div className="inline-flex items-center gap-2 rounded-lg border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-[13px] py-[5px]">
        <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
          {tag}
        </span>
        <span className="text-[14px] font-medium leading-5 text-[#4edea3]">{value}</span>
      </div>
    </div>
  )
}
