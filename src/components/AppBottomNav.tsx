import { Link, useLocation } from 'react-router-dom'

/** Same Figma assets as HomePage bottom nav */
const IMG_NAV_HOME =
  'https://www.figma.com/api/mcp/asset/f8159318-98f5-4a10-b23a-f31f75ab63d2'
const IMG_NAV_APPS =
  'https://www.figma.com/api/mcp/asset/2f0e5483-ac22-4b91-b8e3-e37f972705eb'
const IMG_NAV_GRAPH =
  'https://www.figma.com/api/mcp/asset/7855d582-3072-4873-b03d-5ef445275ad5'
const IMG_NAV_SETTINGS =
  'https://www.figma.com/api/mcp/asset/cb903a54-72f1-4f23-92c3-c40fa0a0ccf6'

function navLabel(active: boolean) {
  return `text-[8px] font-bold uppercase leading-3 tracking-[0.8px] ${
    active ? 'text-[#4edea3]' : 'text-[rgba(185,199,224,0.5)]'
  }`
}

export type AppBottomNavProps = {
  /** Used while on `/tasks` when set (e.g. Tasks page PNG) */
  tasksIconSrc?: string
  /** Used while on `/settings` when set (e.g. Settings page PNG) */
  settingsIconSrc?: string
  /** Larger settings glyph + hit area (e.g. Settings route with custom active icon) */
  largeSettingsIcon?: boolean
}

export function AppBottomNav({
  tasksIconSrc,
  settingsIconSrc,
  largeSettingsIcon,
}: AppBottomNavProps) {
  const { pathname } = useLocation()

  const tasksSrc =
    pathname === '/tasks' && tasksIconSrc ? tasksIconSrc : IMG_NAV_APPS
  const settingsSrc =
    pathname === '/settings' && settingsIconSrc ? settingsIconSrc : IMG_NAV_SETTINGS

  const tasksImgClass =
    pathname === '/tasks' && tasksIconSrc ? 'object-contain' : ''
  const settingsImgClass =
    pathname === '/settings' && settingsIconSrc ? 'object-contain' : ''

  const settingsIconWrapClass =
    largeSettingsIcon && pathname === '/settings'
      ? 'relative size-10'
      : 'relative h-5 w-[20.1px]'

  return (
    <nav
      className="acta-nav-fixed acta-nav-home h-20 overflow-visible bg-[rgba(19,19,19,0.9)] backdrop-blur-[12px]"
      aria-label="Primary"
    >
      <div className="relative mx-auto h-20 w-full max-w-[390px]">
        <div className="grid h-full w-full grid-cols-5 items-end gap-0 px-1 pb-2 pt-0">
          <Link
            to="/"
            className="flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            <div className="relative h-[18px] w-4">
              <img
                alt=""
                className="absolute inset-0 size-full max-w-none"
                src={IMG_NAV_HOME}
              />
            </div>
            <span className={navLabel(pathname === '/')}>HOME</span>
          </Link>
          <Link
            to="/tasks"
            className="flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={pathname === '/tasks' ? 'page' : undefined}
          >
            <div className="relative size-[19.3px]">
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none ${tasksImgClass} ${
                  pathname === '/tasks' ? 'drop-shadow-[0_0_8px_rgba(78,222,163,0.75)]' : ''
                }`}
                src={tasksSrc}
              />
            </div>
            <span className={navLabel(pathname === '/tasks')}>TASKS</span>
          </Link>
          <div className="flex justify-center" aria-hidden />
          <Link
            to="/graph"
            className="flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={pathname === '/graph' ? 'page' : undefined}
          >
            <div className="relative h-[23px] w-6">
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none ${
                  pathname === '/graph' ? 'drop-shadow-[0_0_10px_rgba(78,222,163,0.85)]' : ''
                }`}
                src={IMG_NAV_GRAPH}
              />
            </div>
            <span className={navLabel(pathname === '/graph')}>GRAPH</span>
          </Link>
          <Link
            to="/settings"
            className="flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={pathname === '/settings' ? 'page' : undefined}
          >
            <div className={settingsIconWrapClass}>
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none ${settingsImgClass} ${
                  pathname === '/settings' ? 'drop-shadow-[0_0_8px_rgba(78,222,163,0.9)]' : ''
                }`}
                src={settingsSrc}
              />
            </div>
            <span className={navLabel(pathname === '/settings')}>SETTINGS</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
