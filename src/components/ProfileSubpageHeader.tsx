import { Link } from 'react-router-dom'

import { ICON_CHEVRON_LEFT } from '../assets/actaIconUrls'

const imgBack = ICON_CHEVRON_LEFT

type ProfileSubpageHeaderProps = {
  title: string
}

/**
 * Figma: back to profile, centered title (9:2, 9:81, 9:151, 9:229).
 */
export function ProfileSubpageHeader({ title }: ProfileSubpageHeaderProps) {
  return (
    <header className="acta-header-fixed z-20 flex h-16 w-full max-w-[390px] items-center justify-center border-b border-[rgba(60,74,66,0.1)] bg-[#131313]">
      <Link
        to="/profile"
        className="absolute left-6 top-1/2 flex size-[34px] -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-[rgba(255,255,255,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4edea3]"
        aria-label="Back to profile"
      >
        <div className="size-[18px]">
          <img alt="" className="size-full object-contain" src={imgBack} />
        </div>
      </Link>
      <h1 className="text-center text-[18px] font-bold leading-6 tracking-[-0.45px] text-[#e5e2e1]">
        {title}
      </h1>
    </header>
  )
}
