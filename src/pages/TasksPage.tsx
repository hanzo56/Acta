import { AppBottomNav } from '../components/AppBottomNav'

/** Figma node 21:3 — Tasks / Ready to delegate */
const imgUserProfilePhoto =
  'https://www.figma.com/api/mcp/asset/c988cd55-c214-4dc8-9942-ff9b97114f3d'
const imgInputSparkle =
  'https://www.figma.com/api/mcp/asset/a208f51a-7592-426d-9485-cd9a184c4721'
const imgTaskMail =
  'https://www.figma.com/api/mcp/asset/e44116c1-1090-4324-b585-1e9613865c84'
const imgTaskCalendar =
  'https://www.figma.com/api/mcp/asset/91da8ec2-d776-4fd5-a2c6-973b7e7392f1'
const imgTaskDoc =
  'https://www.figma.com/api/mcp/asset/e75c96f3-34ea-4d75-82ee-9372b7064e11'
const imgInsightPredictive =
  'https://www.figma.com/api/mcp/asset/77f20aff-a149-4e93-8396-1b2a78a17f62'
const imgFabPlus =
  'https://www.figma.com/api/mcp/asset/a0e12bfa-9a6c-43ef-ae8e-97d6b19ea229'
const imgHeaderSearch =
  'https://www.figma.com/api/mcp/asset/2d5f8865-edc4-4921-8675-5a7b1f7a1981'

export function TasksPage() {
  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <header className="acta-header-fixed z-10 flex h-16 items-center justify-between bg-[#131313] px-6">
        <div className="size-8 overflow-hidden rounded-full bg-[#201f1f]">
          <img alt="" className="size-full object-cover" src={imgUserProfilePhoto} />
        </div>
        <button type="button" className="rounded-full p-2" aria-label="Search">
          <img alt="" className="size-[18px]" src={imgHeaderSearch} />
        </button>
      </header>

      <main className="acta-main acta-main--inset-both max-w-[896px] px-6 pb-28 pt-4">
        <div className="flex flex-col gap-12">
          {/* Quiet hero + input */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[36px] font-semibold leading-10 tracking-[-0.9px]">
              <span className="text-[#e5e2e1]">Ready to </span>
              <span className="text-[#bbcabf]">delegate.</span>
            </h2>

            <div className="relative flex items-center rounded-2xl bg-[#1c1b1b] p-5 shadow-[0px_0px_0px_1px_rgba(60,74,66,0.1)]">
              <div className="relative h-[22px] w-[38px] shrink-0">
                <img alt="" className="absolute inset-0 size-full max-w-none object-contain" src={imgInputSparkle} />
              </div>
              <label htmlFor="tasks-need-input" className="sr-only">
                What do you need?
              </label>
              <input
                id="tasks-need-input"
                type="search"
                placeholder="What do you need?"
                className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-[18px] font-medium text-[#e5e2e1] placeholder:text-[rgba(187,202,191,0.4)] focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          {/* Recent tasks */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
                RECENT TASKS
              </h3>
              <button
                type="button"
                className="text-[11px] font-semibold uppercase leading-[16.5px] tracking-wide text-[#bbcabf] hover:text-[#e5e2e1]"
              >
                View All
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Task card — completed */}
              <article className="flex flex-col gap-4 rounded-2xl border border-[rgba(60,74,66,0.05)] bg-[#1c1b1b] p-[25px]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[rgba(187,202,191,0.5)]">
                      COMPLETED
                    </span>
                    <span className="text-[10px] font-normal leading-[15px] text-[rgba(187,202,191,0.4)]">
                      24 mins ago
                    </span>
                  </div>
                  <h4 className="text-[20px] font-semibold leading-7 tracking-[-0.5px] text-[#e5e2e1]">
                    Schedule investor calls
                  </h4>
                  <p className="text-[15px] font-normal leading-[24px] text-[#bbcabf]">
                    Coordinated meeting times with 5 venture partners for the upcoming briefing.
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-transparent pt-2">
                  <div className="flex items-center">
                    <div className="relative flex size-8 items-center justify-center rounded-lg bg-[#201f1f] shadow-[0_0_0_2px_#1c1b1b]">
                      <img alt="" className="h-2 w-2.5 object-contain" src={imgTaskMail} />
                    </div>
                    <div className="relative -ml-2 flex size-8 items-center justify-center rounded-lg bg-[#201f1f] shadow-[0_0_0_2px_#1c1b1b]">
                      <img alt="" className="h-2.5 w-2 object-contain" src={imgTaskCalendar} />
                    </div>
                  </div>
                  <div className="h-8 w-px bg-[rgba(60,74,66,0.1)]" aria-hidden />
                  <div className="text-right">
                    <p className="text-[14px] font-semibold leading-5 text-[#e5e2e1]">3 sent</p>
                    <p className="text-[9px] font-normal uppercase leading-[13.5px] tracking-[0.45px] text-[rgba(187,202,191,0.4)]">
                      OUTCOME
                    </p>
                  </div>
                </div>
              </article>

              {/* Task card — running */}
              <article className="flex flex-col gap-4 rounded-2xl border border-[rgba(60,74,66,0.05)] bg-[#1c1b1b] p-[25px]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#4edea3]">
                      RUNNING
                    </span>
                    <span className="text-[10px] font-normal leading-[15px] text-[rgba(187,202,191,0.4)]">
                      2 hours ago
                    </span>
                  </div>
                  <h4 className="text-[20px] font-semibold leading-7 tracking-[-0.5px] text-[#e5e2e1]">
                    Draft research memo
                  </h4>
                  <p className="text-[15px] font-normal leading-[24px] text-[#bbcabf]">
                    Synthesizing market data from internal repositories and public filings.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#201f1f] shadow-[0_0_0_2px_#1c1b1b]">
                    <img alt="" className="h-2.5 w-2 object-contain" src={imgTaskDoc} />
                  </div>
                  <div className="h-8 w-px bg-[rgba(60,74,66,0.1)]" aria-hidden />
                  <div className="text-right">
                    <p className="text-[14px] font-semibold leading-5 text-[#e5e2e1]">65%</p>
                    <p className="text-[9px] font-normal uppercase leading-[13.5px] tracking-[0.45px] text-[rgba(187,202,191,0.4)]">
                      STATUS
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Insights */}
          <section className="flex flex-col gap-6 pt-4">
            <h3 className="px-2 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.1px] text-[#bbcabf]">
              INSIGHTS
            </h3>

            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-[#1c1b1b] p-6">
                <p className="text-[10px] font-semibold uppercase leading-[15px] tracking-[1px] text-[#4edea3]">
                  EFFICIENCY INDEX
                </p>
                <p className="mt-3 text-[24px] font-bold leading-8 text-[#e5e2e1]">12.4 hours saved</p>
                <p className="mt-2 max-w-[320px] text-[15px] font-normal leading-[22.5px] text-[#bbcabf]">
                  Significant deep-work time reclaimed this week through automated triaging.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[rgba(60,74,66,0.05)] bg-[#1c1b1b] p-[25px]">
                <div className="h-[25px] w-full">
                  <img alt="" className="h-full w-auto object-contain" src={imgInsightPredictive} />
                </div>
                <div>
                  <p className="text-[14px] font-bold leading-5 text-[#e5e2e1]">Predictive Action</p>
                  <p className="mt-1 pb-3 text-[12px] font-normal leading-[18px] text-[#bbcabf]">
                    Draft Friday wrap-up?
                  </p>
                  <button
                    type="button"
                    className="w-full rounded-lg bg-[#2a2a2a] py-2 text-center text-[12px] font-semibold leading-4 text-[#e5e2e1] hover:bg-[#333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
                  >
                    Execute
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FAB — above bottom nav */}
      <button
        type="button"
        className="fixed right-6 z-[35] flex size-14 items-center justify-center rounded-full bg-[#4edea3] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
        style={{
          bottom: 'calc(var(--acta-nav-h, 5rem) + env(safe-area-inset-bottom, 0px) + 16px)',
        }}
        aria-label="New task"
      >
        <img alt="" className="size-3.5 object-contain" src={imgFabPlus} />
      </button>

      <AppBottomNav tasksIconSrc="/nav-tasks-icon.png" />
    </div>
  )
}
