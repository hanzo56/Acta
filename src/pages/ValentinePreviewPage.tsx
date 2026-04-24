import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ICON_FORK_KNIFE as imgFork,
  ICON_MESSAGES as imgMessages,
} from "../assets/actaIconUrls";
import { RemoteNavMicCluster } from "../components/RemoteNavMicCluster";

/** OpenStreetMap — greater Hollywood / L.A. (concert-venue area). */
const OSM_LA_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=-118.4%2C33.90%2C-118.15%2C34.15&layer=mapnik";

const STAGGER_MS = 4_800;

const SECTION_COUNT = 6;

/**
 * “Jaw-dropping” Valentine’s surprise for Sarah — preview of the plan
 * (inspired by team thread: text history, friends, chef, concert, custom song).
 */
export function ValentinePreviewPage() {
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
      <main className="acta-main acta-main--inset-preview w-full px-6">
        <div className="mx-auto flex w-full max-w-[672px] flex-col gap-12">
          {visibleCount >= 1 ? (
            <header className="acta-preview-reveal flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase leading-[15px] tracking-[2px] text-[#bbcabf]">
                PREVIEW
              </p>
              <h1 className="pt-1 text-[36px] font-bold leading-10 tracking-[-0.9px] text-[#e5e2e1]">
                Valentine surprise for Sarah
              </h1>
              <p className="text-[16px] font-normal leading-6 text-[#bbcabf]">
                Review the sequence: text intelligence, friend input, chef,
                show tickets, and a custom song—built to be jaw-dropping, not
                just functional.
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
                    title="Message history"
                    body={
                      <>
                        Find hints in old texts—e.g. a song she shared, a band
                        playing in your anniversary month, places she
                        mentioned.
                      </>
                    }
                    tag="SIGNAL:"
                    value="Aurora · Feb 14 — from March thread"
                    icon={imgMessages}
                  />
                </div>
                {visibleCount >= 3 ? (
                  <div className="acta-preview-reveal">
                    <TimelineStep
                      title="Friend input"
                      body={
                        <>
                          Quiet poll: gift ideas, timing, and what would feel
                          “too much” vs. just right.
                        </>
                      }
                      tag="CIRCLE:"
                      value="Eugene · Katya · Noah"
                      icon={imgMessages}
                    />
                  </div>
                ) : null}
                {visibleCount >= 4 ? (
                  <div className="acta-preview-reveal">
                    <TimelineStep
                      title="Signature experiences"
                      body={
                        <>
                          Private dinner at home, two seats for the show she’ll
                          love, and a one-of-one track written for her.
                        </>
                      }
                      tag="LINEUP:"
                      value="Chef · Tickets · Custom song"
                      icon={imgFork}
                    />
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {visibleCount >= 5 ? (
            <div className="acta-preview-reveal relative isolate overflow-hidden rounded-2xl border border-[rgba(60,74,66,0.1)]">
              <div className="relative h-44 w-full min-h-[11rem] bg-[#1a1a1a] sm:h-48">
                <iframe
                  title="Map — Los Angeles concert area (preview)"
                  className="pointer-events-none absolute inset-0 size-full scale-[1.02] border-0 contrast-[1.02] grayscale-[0.15]"
                  src={OSM_LA_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(19,19,19,0.88)] via-[rgba(19,19,19,0.2)] to-[rgba(19,19,19,0.15)]" />
              <p className="pointer-events-auto absolute bottom-2 right-3 z-[1] m-0 max-w-[55%] text-right text-[9px] leading-snug text-[rgba(187,202,191,0.55)]">
                ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[rgba(187,202,191,0.35)] underline-offset-2 hover:text-[#bbcabf]"
                >
                  OpenStreetMap
                </a>
              </p>
              <div className="pointer-events-none absolute bottom-4 left-6 flex max-w-[min(100%,calc(100%-7rem))] flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[1px] text-[#bbcabf]">
                  VENUE &amp; NIGHT
                </span>
                <span className="text-[16px] font-bold leading-6 text-[#e5e2e1]">
                  LA · Evening of Feb 14
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <nav
        className="acta-preview-mic-rail acta-nav-home h-20 overflow-visible bg-[rgba(19,19,19,0.9)] backdrop-blur-[12px]"
        aria-label="Quick voice to home"
      >
        <div className="relative mx-auto h-20 w-full max-w-[390px]">
          <RemoteNavMicCluster />
        </div>
      </nav>

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
                navigate("/graph/valentine", {
                  state: { fromPreviewApprove: true },
                })
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
