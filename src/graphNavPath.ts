import {
  readGraphFlowComplete,
  readGraphSequenceStart,
  readGraphStepTimes,
} from "./graphFlowStorage";
import {
  SCENARIO_GRAPH_ROUTE,
  type ScenarioGraphId,
  readScenarioCompletedAt,
  readScenarioFlowComplete,
  readScenarioSequenceStart,
} from "./scenarioGraphStorage";
import {
  readValentineFlowComplete,
  readValentineSequenceStart,
  readValentineStepTimes,
} from "./valentineGraphStorage";

const LAST_GRAPH_NAV_PATH = "acta-last-graph-nav-path";
const LAST_GRAPH_NAV_AT = "acta-last-graph-nav-at";

/** Kept in sync with `GraphPage` `STEPS.length` */
const DINNER_STEP_COUNT = 6;
/** Kept in sync with `ValentineGraphPage` `STEPS.length` */
const VALENTINE_STEP_COUNT = 9;

const SCENARIO_IDS: ScenarioGraphId[] = [
  "book-dinner",
  "message-team",
  "summarize-brief",
];

export type GraphNavPath =
  | "/graph"
  | "/graph/valentine"
  | "/graph/book-dinner"
  | "/graph/message-team"
  | "/graph/summarize-brief";

const VALID_GRAPH_PATHS = new Set<string>([
  "/graph",
  "/graph/valentine",
  "/graph/book-dinner",
  "/graph/message-team",
  "/graph/summarize-brief",
]);

type InFlight = { path: GraphNavPath; start: number };

function listInFlightGraphs(): InFlight[] {
  const out: InFlight[] = [];
  for (const id of SCENARIO_IDS) {
    if (readScenarioFlowComplete(id)) continue;
    const start = readScenarioSequenceStart(id);
    if (start != null) {
      out.push({
        path: SCENARIO_GRAPH_ROUTE[id] as GraphNavPath,
        start,
      });
    }
  }
  if (!readValentineFlowComplete()) {
    const vs = readValentineSequenceStart();
    if (vs != null) out.push({ path: "/graph/valentine", start: vs });
  }
  if (!readGraphFlowComplete()) {
    const ds = readGraphSequenceStart();
    if (ds != null) out.push({ path: "/graph", start: ds });
  }
  return out;
}

/**
 * Call when a graph run finishes, using the last step’s completion time (or max of all step times).
 * Whichever run finishes **last** wins the default Graph tab target until the next completion.
 */
export function writeLastCompletedGraphNav(
  path: GraphNavPath,
  lastStepCompleteMs: number,
) {
  if (!Number.isFinite(lastStepCompleteMs)) return;
  try {
    const prevAtRaw = sessionStorage.getItem(LAST_GRAPH_NAV_AT);
    const prevAt = prevAtRaw == null ? null : Number(prevAtRaw);
    if (
      prevAt == null ||
      !Number.isFinite(prevAt) ||
      lastStepCompleteMs >= prevAt
    ) {
      sessionStorage.setItem(LAST_GRAPH_NAV_PATH, path);
      sessionStorage.setItem(LAST_GRAPH_NAV_AT, String(lastStepCompleteMs));
    }
  } catch {
    /* ignore */
  }
}

function readLastNavFromStorage(): { path: GraphNavPath; at: number } | null {
  try {
    const p = sessionStorage.getItem(LAST_GRAPH_NAV_PATH);
    const a = sessionStorage.getItem(LAST_GRAPH_NAV_AT);
    if (p == null || !VALID_GRAPH_PATHS.has(p)) return null;
    const at = a == null ? NaN : Number(a);
    if (!Number.isFinite(at)) return null;
    return { path: p as GraphNavPath, at };
  } catch {
    return null;
  }
}

function dinnerMaxStepMs(): number | null {
  if (!readGraphFlowComplete()) return null;
  const t = readGraphStepTimes(DINNER_STEP_COUNT);
  if (!t?.length) return null;
  return Math.max(...t);
}

function valentineMaxStepMs(): number | null {
  if (!readValentineFlowComplete()) return null;
  const t = readValentineStepTimes(VALENTINE_STEP_COUNT);
  if (!t?.length) return null;
  return Math.max(...t);
}

/** If no `writeLastCompletedGraphNav` yet (e.g. legacy session), pick by newest completion. */
function inferPathFromCompletionsOnly(): GraphNavPath {
  type C = { path: GraphNavPath; at: number };
  const candidates: C[] = [];
  const d = dinnerMaxStepMs();
  if (d != null) candidates.push({ path: "/graph", at: d });
  const v = valentineMaxStepMs();
  if (v != null) candidates.push({ path: "/graph/valentine", at: v });
  for (const id of SCENARIO_IDS) {
    if (!readScenarioFlowComplete(id)) continue;
    let at = readScenarioCompletedAt(id);
    if (at == null) at = 0;
    candidates.push({
      path: SCENARIO_GRAPH_ROUTE[id] as GraphNavPath,
      at,
    });
  }
  if (!candidates.length) return "/graph";
  candidates.sort((a, b) => b.at - a.at);
  return candidates[0].path;
}

/**
 * Default target for the Graph button: in-flight run with the newest sequence start first,
 * else last explicit completion target, else infer from completed graphs.
 */
export function getGraphNavPath(): GraphNavPath {
  const inFlight = listInFlightGraphs();
  if (inFlight.length) {
    inFlight.sort((a, b) => b.start - a.start);
    return inFlight[0].path;
  }
  const last = readLastNavFromStorage();
  if (last) {
    return last.path;
  }
  return inferPathFromCompletionsOnly();
}
