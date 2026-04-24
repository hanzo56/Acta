import { Link, useLocation } from "react-router-dom";

import {
  ICON_NAV_APPS as IMG_NAV_APPS,
  ICON_NAV_GRAPH as IMG_NAV_GRAPH,
  ICON_NAV_HOME as IMG_NAV_HOME,
  ICON_NAV_SETTINGS as IMG_NAV_SETTINGS,
} from "../assets/actaIconUrls";

function navLabel(active: boolean) {
  return `text-[8px] font-bold uppercase leading-3 tracking-[0.8px] ${
    active ? "text-[#4edea3]" : "text-[rgba(185,199,224,0.5)]"
  }`;
}

export type AppBottomNavProps = {
  /** Used while on `/tasks` when set (e.g. Tasks page PNG) */
  tasksIconSrc?: string;
  /** Used while on `/settings` when set (e.g. Settings page PNG) */
  settingsIconSrc?: string;
  /** Larger settings glyph + hit area (e.g. Settings route with custom active icon) */
  largeSettingsIcon?: boolean;
};

export function AppBottomNav({
  tasksIconSrc,
  settingsIconSrc,
  largeSettingsIcon,
}: AppBottomNavProps) {
  const { pathname } = useLocation();

  const tasksSrc =
    pathname === "/tasks" && tasksIconSrc ? tasksIconSrc : IMG_NAV_APPS;
  const settingsActive = pathname === "/settings" || pathname === "/profile";
  const settingsSrc =
    settingsActive && settingsIconSrc ? settingsIconSrc : IMG_NAV_SETTINGS;

  const tasksImgClass =
    pathname === "/tasks" && tasksIconSrc ? "object-contain" : "";
  const settingsImgClass =
    settingsActive && settingsIconSrc ? "object-contain" : "";

  const settingsIconWrapClass =
    largeSettingsIcon && settingsActive
      ? "relative size-10"
      : "relative h-5 w-[20.1px]";

  const graphActive = pathname === "/graph" || pathname.startsWith("/graph/");

  return (
    <nav
      className="acta-nav-fixed acta-nav-home h-20 overflow-visible bg-[rgba(19,19,19,0.9)] backdrop-blur-[12px]"
      aria-label="Primary"
    >
      <div className="relative mx-auto h-20 w-full max-w-[390px]">
        <div className="grid h-full w-full grid-cols-5 items-end gap-0 px-1 pb-2 pt-0">
          <Link
            to="/"
            className="group flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <div className="relative h-5 w-[21px]">
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none origin-bottom transition duration-200 ${
                  pathname === "/"
                    ? "group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(78,222,163,0.5)]"
                    : "opacity-80 group-hover:opacity-100"
                }`}
                src={IMG_NAV_HOME}
              />
            </div>
            <span className={navLabel(pathname === "/")}>HOME</span>
          </Link>
          <Link
            to="/tasks"
            className="group flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={pathname === "/tasks" ? "page" : undefined}
          >
            <div className="relative size-[19.3px]">
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none origin-bottom transition duration-200 ${tasksImgClass} ${
                  pathname === "/tasks"
                    ? "drop-shadow-[0_0_8px_rgba(78,222,163,0.75)] group-hover:drop-shadow-[0_0_12px_rgba(78,222,163,0.9)] group-hover:scale-110"
                    : "opacity-80 group-hover:opacity-100"
                }`}
                src={tasksSrc}
              />
            </div>
            <span className={navLabel(pathname === "/tasks")}>TASKS</span>
          </Link>
          <div className="flex justify-center" aria-hidden />
          <Link
            to="/graph"
            className="group flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={graphActive ? "page" : undefined}
          >
            <div className="relative h-[23px] w-6">
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none origin-bottom transition duration-200 ${
                  graphActive
                    ? "[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(31%)_saturate(650%)_hue-rotate(99deg)_brightness(98%)_contrast(92%)_drop-shadow(0_0_8px_rgba(78,222,163,0.65))] group-hover:scale-110"
                    : "opacity-80 group-hover:opacity-100"
                }`}
                src={IMG_NAV_GRAPH}
              />
            </div>
            <span className={navLabel(graphActive)}>GRAPH</span>
          </Link>
          <Link
            to="/settings"
            className="group flex flex-col items-center justify-end gap-1 pb-0.5"
            aria-current={settingsActive ? "page" : undefined}
          >
            <div className={settingsIconWrapClass}>
              <img
                alt=""
                className={`absolute inset-0 size-full max-w-none ${settingsImgClass} origin-bottom transition duration-200 ${
                  settingsActive
                    ? "drop-shadow-[0_0_8px_rgba(78,222,163,0.9)] group-hover:drop-shadow-[0_0_12px_rgba(78,222,163,1)] group-hover:scale-110"
                    : "opacity-80 group-hover:opacity-100"
                }`}
                src={settingsSrc}
              />
            </div>
            <span className={navLabel(settingsActive)}>SETTINGS</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
