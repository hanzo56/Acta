/** Set when the graph execution timeline has finished; keeps UI complete when returning from menu etc. */
export const GRAPH_FLOW_STORAGE_KEY = 'acta-graph-flow-complete'

/** JSON array of completion timestamps (ms since epoch), one per graph step */
const GRAPH_STEP_TIMES_KEY = 'acta-graph-flow-step-times'

export function readGraphFlowComplete(): boolean {
  try {
    return sessionStorage.getItem(GRAPH_FLOW_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeGraphFlowComplete() {
  try {
    sessionStorage.setItem(GRAPH_FLOW_STORAGE_KEY, '1')
  } catch {
    /* ignore private mode / quota */
  }
}

export function clearGraphFlowComplete() {
  try {
    sessionStorage.removeItem(GRAPH_FLOW_STORAGE_KEY)
    sessionStorage.removeItem(GRAPH_STEP_TIMES_KEY)
  } catch {
    /* ignore */
  }
}

export function readGraphStepTimes(expectedLen: number): number[] | null {
  try {
    const raw = sessionStorage.getItem(GRAPH_STEP_TIMES_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length !== expectedLen) return null
    if (!parsed.every((n) => typeof n === 'number' && Number.isFinite(n))) return null
    return parsed as number[]
  } catch {
    return null
  }
}

export function writeGraphStepTimes(timestamps: number[]) {
  try {
    sessionStorage.setItem(GRAPH_STEP_TIMES_KEY, JSON.stringify(timestamps))
  } catch {
    /* ignore private mode / quota */
  }
}
