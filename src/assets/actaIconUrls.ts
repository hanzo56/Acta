/**
 * Stable inline SVG icons as data URLs. Replaces Figma MCP asset URLs, which
 * expire and break in the browser outside an authenticated MCP session.
 */
function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const S = '#bbcabf'
const S2 = '#e5e2e1'
const MINT = '#4edea3'

function outlineIcon(paths: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${S}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

function outlineIconLight(paths: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${S2}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

/** Bottom nav + headers — muted so active labels / filters read clearly */
export const ICON_NAV_HOME = svgDataUrl(
  outlineIcon('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'),
)

export const ICON_NAV_APPS = svgDataUrl(
  outlineIcon(
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  ),
)

export const ICON_NAV_GRAPH = svgDataUrl(
  outlineIcon(
    '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 6.5h7M15.5 6.5 8 17.5"/>',
  ),
)

export const ICON_NAV_SETTINGS = svgDataUrl(
  outlineIcon(
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  ),
)

/** Figma home bottom bar (9:983): active HOME + inactive tabs */
const NAV_DIM = 'rgba(185,199,224,0.5)'

function outlineNavDim(paths: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${NAV_DIM}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

export const ICON_NAV_HOME_SOLID = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${MINT}"><path d="M10 20v-8h4v8h5v-12h3L12 3 2 9h3v11h5z"/></svg>`,
)

export const ICON_NAV_APPS_DIM = svgDataUrl(
  outlineNavDim(
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  ),
)

export const ICON_NAV_GRAPH_DIM = svgDataUrl(
  outlineNavDim(
    '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 6.5h7M15.5 6.5 8 17.5"/>',
  ),
)

export const ICON_NAV_SETTINGS_DIM = svgDataUrl(
  outlineNavDim(
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  ),
)

/** Figma center FAB: filled mint microphone */
export const ICON_MIC_MINT = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${MINT}"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>`,
)

export const ICON_USER_AVATAR = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2d3330"/><stop offset="100%" stop-color="#1a1c1b"/></linearGradient></defs><circle cx="24" cy="24" r="24" fill="url(#a)"/><circle cx="24" cy="18" r="8" fill="${S}"/><path fill="${S}" d="M8 44c0-8.8 7.2-16 16-16s16 7.2 16 16v2H8z" opacity="0.85"/></svg>`,
)

export const ICON_CALENDAR = svgDataUrl(
  outlineIconLight(
    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  ),
)

export const ICON_FORK_KNIFE = svgDataUrl(
  outlineIconLight(
    '<path d="M8 3v9a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3"/><path d="M8 3c0 2 1 3 2 3s2-1 2-3"/><path d="M16 3v17"/><path d="M16 3c0 2.5 1.5 4 3 4s3-1.5 3-4"/>',
  ),
)

export const ICON_CHAT = svgDataUrl(
  outlineIconLight(
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.25-7.35 8.38 8.38 0 0 1 3.8-.95H12a8.5 8.5 0 0 1 8.5 8.5z"/>',
  ),
)

export const ICON_LIST = svgDataUrl(
  outlineIconLight(
    `<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="5" cy="6" r="1.5" fill="${S2}"/><circle cx="5" cy="12" r="1.5" fill="${S2}"/><circle cx="5" cy="18" r="1.5" fill="${S2}"/>`,
  ),
)

export const ICON_MIC = svgDataUrl(
  outlineIconLight(
    '<path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"/>',
  ),
)

export const ICON_SETTINGS_GEAR = svgDataUrl(
  outlineIconLight(
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  ),
)

export const ICON_MESSAGES = svgDataUrl(
  outlineIconLight(
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7M17 12H7"/>',
  ),
)

export const ICON_CHECK = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="${MINT}" stroke-width="1.5"/><path d="m8 12 2.5 2.5L16 9" stroke="${MINT}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
)

export const ICON_BELL = svgDataUrl(
  outlineIconLight(
    '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  ),
)

export const ICON_ELLIPSIS = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${S}"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
)

export const ICON_SEARCH = svgDataUrl(
  outlineIconLight('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
)

export const ICON_CHEVRON_RIGHT = svgDataUrl(
  outlineIcon('<path d="m9 18 6-6-6-6"/>'),
)

export const ICON_MAIL = svgDataUrl(
  outlineIconLight(
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  ),
)

export const ICON_DOC = svgDataUrl(
  outlineIconLight(
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/>',
  ),
)

export const ICON_INSIGHT = svgDataUrl(
  outlineIconLight(
    `<path d="M3 3v18h18"/><path d="M7 14l3-3 3 2 5-6"/><circle cx="7" cy="14" r="1.2" fill="${S2}"/><circle cx="10" cy="11" r="1.2" fill="${S2}"/><circle cx="13" cy="13" r="1.2" fill="${S2}"/><circle cx="18" cy="7" r="1.2" fill="${S2}"/>`,
  ),
)

export const ICON_MAP = svgDataUrl(
  outlineIconLight(
    '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  ),
)

export const ICON_SLACK = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="8.5" cy="8.5" r="2.8" fill="#36C5F0"/><circle cx="15.5" cy="8.5" r="2.8" fill="#2EB67D"/><circle cx="8.5" cy="15.5" r="2.8" fill="#ECB22E"/><circle cx="15.5" cy="15.5" r="2.8" fill="#E01E5A"/></svg>`,
)

/** Gmail-style mark (no external trademark artwork; recognizable envelope) */
export const ICON_GMAIL = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#EA4335" d="M22 6v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-.55.22-1.05.58-1.42L12 12l9.42-7.42A2 2 0 0 1 22 6z"/><path fill="#FBBC05" d="M22 6v12L14 13V4.5z"/><path fill="#34A853" d="M22 18H4L12 12l10 6z"/><path fill="#4285F4" d="M2 6v12l8-5V4.5z"/><path fill="#C5221F" d="M12 12 2 4.5V6l10 6z"/></svg>`,
)

export const ICON_OPENTABLE = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#DA3743" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 8v8M15 8v8M9 12h6"/></svg>`,
)

export const ICON_SPARKLE = svgDataUrl(
  outlineIconLight(
    `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="2.5" fill="${S2}"/>`,
  ),
)

export const ICON_DOTS_VERTICAL = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${S}"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>`,
)

export const ICON_EDIT = svgDataUrl(
  outlineIconLight(
    '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  ),
)

export const ICON_ACCOUNT = svgDataUrl(
  outlineIconLight(
    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M8 17h8"/>',
  ),
)

export const ICON_SUBSCRIPTION = svgDataUrl(
  outlineIconLight(
    '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  ),
)

export const ICON_PRIVACY = svgDataUrl(
  outlineIconLight(
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  ),
)

export const ICON_AGENT_INSIGHTS = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d0bcff" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 1 7 7c0 3.5-2 6.5-5 8H10c-3-1.5-5-4.5-5-8a7 7 0 0 1 7-7z"/><path d="M9.5 9.5h.01M14.5 9.5h.01"/></svg>`,
)

export const ICON_SIGN_OUT = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffb4ab" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`,
)

/** Decorative ring behind profile avatar (replaces Figma frame asset) */
export const ICON_PROFILE_RING_BADGE = svgDataUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" fill="none"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${MINT}"/><stop offset="100%" stop-color="#d0bcff"/></linearGradient></defs><circle cx="17" cy="17" r="15" stroke="url(#g)" stroke-width="2.5" opacity="0.9"/><circle cx="26" cy="26" r="5" fill="#131313" stroke="url(#g)" stroke-width="1.5"/></svg>`,
)
