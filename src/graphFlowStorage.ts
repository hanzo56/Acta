/** Set when the graph execution timeline has finished; keeps UI complete when returning from menu etc. */
export const GRAPH_FLOW_STORAGE_KEY = 'acta-graph-flow-complete'

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
