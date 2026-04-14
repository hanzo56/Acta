import { Link } from 'react-router-dom'

const MENU_IMAGES = [
  { src: '/images/tori-tori/04-menu-1.png', alt: 'Tori Tori — menu page 1' },
  { src: '/images/tori-tori/05-menu-2.png', alt: 'Tori Tori — menu page 2' },
] as const

export function GraphMenuPage() {
  return (
    <div className="min-h-[100svh] bg-[#131313] text-[#e5e2e1]">
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-[rgba(60,74,66,0.15)] bg-[rgba(19,19,19,0.95)] px-4 py-3 backdrop-blur-md">
        <Link
          to="/graph"
          className="rounded-xl bg-[rgba(78,222,163,0.15)] px-4 py-2.5 text-[14px] font-semibold text-[#4edea3] transition hover:bg-[rgba(78,222,163,0.28)]"
        >
          ← Back to graph
        </Link>
        <span className="text-[15px] font-medium text-[#bbcabf]">Tori Tori — Menu</span>
      </header>
      <div className="mx-auto max-w-lg px-4 py-6 pb-16">
        {MENU_IMAGES.map((m) => (
          <img
            key={m.src}
            src={m.src}
            alt={m.alt}
            className="mb-6 w-full rounded-xl border border-[rgba(60,74,66,0.2)] shadow-lg shadow-black/20"
          />
        ))}
      </div>
    </div>
  )
}
