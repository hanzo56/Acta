import { Link } from 'react-router-dom'

const MENU_IMAGES = [
  { src: '/images/tori-tori/04-menu-1.png', alt: 'Tori Tori — menu page 1' },
  { src: '/images/tori-tori/05-menu-2.png', alt: 'Tori Tori — menu page 2' },
] as const

export function GraphMenuPage() {
  return (
    <div className="acta-shell bg-[#131313] text-[#e5e2e1]">
      <header className="acta-header-fixed z-20 flex h-14 w-full items-center gap-3 border-b border-[rgba(60,74,66,0.15)] bg-[rgba(19,19,19,0.95)] px-4 backdrop-blur-md">
        <Link
          to="/graph"
          className="shrink-0 whitespace-nowrap rounded-xl bg-[rgba(78,222,163,0.15)] px-3 py-2 text-[12px] font-semibold text-[#4edea3] transition hover:bg-[rgba(78,222,163,0.28)] sm:text-[13px]"
        >
          ← Back to graph
        </Link>
        <span className="min-w-0 truncate text-[15px] font-medium text-[#bbcabf]">Tori Tori — Menu</span>
      </header>

      <main className="acta-main acta-main--inset-menu px-4 py-6">
        <div className="mx-auto max-w-lg">
          {MENU_IMAGES.map((m) => (
            <img
              key={m.src}
              src={m.src}
              alt={m.alt}
              className="mb-6 w-full rounded-xl border border-[rgba(60,74,66,0.2)] shadow-lg shadow-black/20 last:mb-0"
            />
          ))}
        </div>
      </main>
    </div>
  )
}
