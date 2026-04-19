import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const imgMap =
  "https://www.figma.com/api/mcp/asset/eaf7b63c-c64f-4bbf-bdf6-c73d408fe920";
const imgMessages =
  "https://www.figma.com/api/mcp/asset/13775fd3-f434-43fb-9d63-13b1f713525a";
const imgCalendar =
  "https://www.figma.com/api/mcp/asset/3429baad-9ae0-4bd2-91f6-7603bb4a7ce9";
const imgOpenTable =
  "https://www.figma.com/api/mcp/asset/15cb743f-3903-41f2-a2a1-d44319c5e6ca";

/** First block shows immediately; each following block after this delay. */
const STAGGER_MS = 5000;

/** Header, 3 timeline steps, map card, approve footer. */
const SECTION_COUNT = 6;

export function PreviewPage() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < SECTION_COUNT; i++) {
      ids.push(
        window.setTimeout(() => {
          setVisibleCount((c) => Math.max(c, i + 1));
        }, i * STAGGER_MS),
      );
    }
    return () => ids.forEach(clearTimeout);
  }, []);

  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <main className="acta-main acta-main--inset-preview flex w-full max-w-[672px] flex-col gap-12 px-6">
        {visibleCount >= 1 ? (
          <header className="acta-preview-reveal flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[2px] text-[#bbcabf]">
              PREVIEW
            </p>
            <h1 className="pt-1 text-[36px] font-bold leading-10 tracking-[-0.9px] text-[#e5e2e1]">
              Here’s what I’ll do
            </h1>
            <p className="text-[16px] font-normal leading-6 text-[#bbcabf]">
              Review the proposed sequence for your dinner reservation.
            </p>
          </header>
        ) : null}

        {visibleCount >= 2 ? (
          <section className="relative">
            <div
              className="absolute bottom-8 left-6 top-8 w-px bg-[rgba(60,74,66,0.2)]"
              aria-hidden
            />
            <div className="flex flex-col gap-12">
              <div className="acta-preview-reveal">
                <TimelineStep
                  title="Contacts"
                  body={
                    <>
                      Checking for recent dinner mentions
                      <br />
                      and contact details.
                    </>
                  }
                  tag="CONTACT:"
                  value="Sarah Jenkins"
                  icon={imgMessages}
                />
              </div>
              {visibleCount >= 3 ? (
                <div className="acta-preview-reveal">
                  <TimelineStep
                    title="Calendar"
                    body={
                      <>
                        Verifying availability and checking
                        <br />
                        for potential conflicts.
                      </>
                    }
                    tag="TIME:"
                    value="Tomorrow at 7pm"
                    icon={imgCalendar}
                  />
                </div>
              ) : null}
              {visibleCount >= 4 ? (
                <div className="acta-preview-reveal">
                  <TimelineStep
                    title="OpenTable"
                    body={
                      <>
                        Securing a table at your preferred
                        <br />
                        location.
                      </>
                    }
                    tag="LOCATION:"
                    value="TORI TORI SHABU N SUSHI"
                    icon={imgOpenTable}
                  />
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {visibleCount >= 5 ? (
          <div className="acta-preview-reveal relative isolate overflow-hidden rounded-2xl border border-[rgba(60,74,66,0.1)]">
            <div className="relative h-40 w-full opacity-40">
              <img
                alt=""
                className="absolute left-0 top-[-58%] h-[215%] w-full max-w-none object-cover"
                src={imgMap}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(19,19,19,0.8)] via-[rgba(19,19,19,0)] to-[rgba(19,19,19,0)]" />
            <div className="absolute bottom-4 left-6 flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#bbcabf]">
                DESTINATION
              </span>
              <span className="text-[16px] font-bold leading-6 text-[#e5e2e1]">
                TORI TORI SHABU N SUSHI, Arcadia, CA
              </span>
            </div>
          </div>
        ) : null}
      </main>

      <div className="acta-preview-footer-fixed bg-[rgba(19,19,19,0.8)] px-6 pb-12 pt-6 backdrop-blur-[20px]">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-2xl border border-[rgba(187,202,191,0.28)] py-[18px] text-[16px] font-semibold leading-6 text-[#bbcabf] transition hover:border-[rgba(187,202,191,0.45)] hover:bg-[rgba(255,255,255,0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
          >
            Cancel
          </button>
          {visibleCount >= 6 ? (
            <button
              type="button"
              onClick={() =>
                navigate("/graph", { state: { fromPreviewApprove: true } })
              }
              className="acta-preview-reveal relative w-full rounded-2xl bg-[#4edea3] py-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition hover:bg-[#5fe8b3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5e2e1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
            >
              <span className="text-[16px] font-bold leading-6 text-[#00422b]">
                Approve
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TimelineStep({
  title,
  body,
  tag,
  value,
  icon,
}: {
  title: string;
  body: ReactNode;
  tag: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-[rgba(60,74,66,0.1)] bg-[#201f1f] p-px">
        <div className="relative size-[16.67px]">
          <img
            alt=""
            className="absolute inset-0 size-full max-w-none object-contain"
            src={icon}
          />
        </div>
      </div>
      <h3 className="text-[18px] font-bold leading-7 text-[#e5e2e1]">
        {title}
      </h3>
      <div className="pb-3 text-[16px] font-normal leading-6 text-[#bbcabf]">
        {body}
      </div>
      <div className="inline-flex items-center gap-2 rounded-lg border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-[13px] py-[5px]">
        <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
          {tag}
        </span>
        <span className="text-[14px] font-medium leading-5 text-[#4edea3]">
          {value}
        </span>
      </div>
    </div>
  );
}
