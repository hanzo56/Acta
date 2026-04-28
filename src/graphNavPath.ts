import {
  readGraphFlowComplete,
  readGraphSequenceStart,
  readGraphStepTimes,
} from './graphFlowStorage'
import {
  readValentineFlowComplete,
  readValentineSequenceStart,
  readValentineStepTimes,
} from './valentineGraphStorage'

const LAST_GRAPH_NAV_PATH = 'acta-last-graph-nav-path'
const LAST_GRAPH_NAV_AT = 'acta-last-graph-nav-at'

/** Kept in sync with `GraphPage` `STEPS.length` */
const DINNER_STEP_COUNT = 6
/** Kept in sync with `ValentineGraphPage` `STEPS.length` */
const VALENTINE_STEP_COUNT = 9

type GraphNavPath = '/graph' | '/graph/valentine'

/**
 * Call when a graph run finishes, using the last step’s completion time (or max of all step times).
 * Whichever run finishes **last** wins the default Graph tab target until the next completion.
 */
export function writeLastCompletedGraphNav(
  which: 'dinner' | 'valentine',
  lastStepCompleteMs: number,
) {
  if (!Number.isFinite(lastStepCompleteMs)) return
  const path: GraphNavPath = which === 'dinner' ? '/graph' : '/graph/valentine'
  try {
    const prevAtRaw = sessionStorage.getItem(LAST_GRAPH_NAV_AT)
    const prevAt = prevAtRaw == null ? null : Number(prevAtRaw)
    if (
      prevAt == null ||
      !Number.isFinite(prevAt) ||
      lastStepCompleteMs >= prevAt
    ) {
      sessionStorage.setItem(LAST_GRAPH_NAV_PATH, path)
      sessionStorage.setItem(LAST_GRAPH_NAV_AT, String(lastStepCompleteMs))
    }
  } catch {
    /* ignore */
  }
}

function readLastNavFromStorage(): { path: GraphNavPath; at: number } | null {
  try {
    const p = sessionStorage.getItem(LAST_GRAPH_NAV_PATH)
    const a = sessionStorage.getItem(LAST_GRAPH_NAV_AT)
    if (p !== '/graph' && p !== '/graph/valentine') return null
    const at = a == null ? NaN : Number(a)
    if (!Number.isFinite(at)) return null
    return { path: p, at }
  } catch {
    return null
  }
}

function dinnerMaxStepMs(): number | null {
  if (!readGraphFlowComplete()) return null
  const t = readGraphStepTimes(DINNER_STEP_COUNT)
  if (!t?.length) return null
  return Math.max(...t)
}

function valentineMaxStepMs(): number | null {
  if (!readValentineFlowComplete()) return null
  const t = readValentineStepTimes(VALENTINE_STEP_COUNT)
  if (!t?.length) return null
  return Math.max(...t)
}

/** If no `writeLastCompletedGraphNav` yet (e.g. legacy session), pick by newest completion. */
function inferPathFromCompletionsOnly(): GraphNavPath {
  const d = dinnerMaxStepMs()
  const v = valentineMaxStepMs()
  if (d == null && v == null) return '/graph'
  if (d == null) return '/graph/valentine'
  if (v == null) return '/graph'
  return v >= d ? '/graph/valentine' : '/graph'
}

/**
 * Default target for the Graph button: in-flight run first, else most recently **completed** graph
 * (dinner at `/graph` or Valentine at `/graph/valentine`).
 */
export function getGraphNavPath(): GraphNavPath {
  if (!readValentineFlowComplete() && readValentineSequenceStart() != null) {
    return '/graph/valentine'
  }
  if (!readGraphFlowComplete() && readGraphSequenceStart() != null) {
    return '/graph'
  }
  const last = readLastNavFromStorage()
  if (last) {
    return last.path
  }
  return inferPathFromCompletionsOnly()
}
