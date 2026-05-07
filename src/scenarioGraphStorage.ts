export type ScenarioGraphId =
  | "book-dinner"
  | "message-team"
  | "summarize-brief";

export type ScenarioStepStatus = "pending" | "loading" | "done";

export const SCENARIO_GRAPH_ROUTE: Record<ScenarioGraphId, string> = {
  "book-dinner": "/graph/book-dinner",
  "message-team": "/graph/message-team",
  "summarize-brief": "/graph/summarize-brief",
};

function storageKey(id: ScenarioGraphId, suffix: string) {
  return `acta-sg-${id}-${suffix}`;
}

export function readScenarioSequenceStart(id: ScenarioGraphId): number | null {
  try {
    const raw = sessionStorage.getItem(storageKey(id, "seq"));
    if (raw == null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function writeScenarioSequenceStart(id: ScenarioGraphId, ms: number) {
  try {
    sessionStorage.setItem(storageKey(id, "seq"), String(ms));
  } catch {
    /* ignore */
  }
}

export function clearScenarioSequenceStart(id: ScenarioGraphId) {
  try {
    sessionStorage.removeItem(storageKey(id, "seq"));
  } catch {
    /* ignore */
  }
}

export function readScenarioFlowComplete(id: ScenarioGraphId): boolean {
  try {
    return sessionStorage.getItem(storageKey(id, "done")) === "1";
  } catch {
    return false;
  }
}

export function writeScenarioFlowComplete(id: ScenarioGraphId) {
  try {
    sessionStorage.setItem(storageKey(id, "done"), "1");
  } catch {
    /* ignore */
  }
}

export function clearScenarioFlowComplete(id: ScenarioGraphId) {
  try {
    sessionStorage.removeItem(storageKey(id, "done"));
  } catch {
    /* ignore */
  }
}

export function readScenarioFollowUpChoice(id: ScenarioGraphId): string | null {
  try {
    const v = sessionStorage.getItem(storageKey(id, "follow"));
    return v == null || v === "" ? null : v;
  } catch {
    return null;
  }
}

export function writeScenarioFollowUpChoice(id: ScenarioGraphId, choice: string) {
  try {
    sessionStorage.setItem(storageKey(id, "follow"), choice);
  } catch {
    /* ignore */
  }
}

export function clearScenarioFollowUpChoice(id: ScenarioGraphId) {
  try {
    sessionStorage.removeItem(storageKey(id, "follow"));
  } catch {
    /* ignore */
  }
}

export function readScenarioCompletedAt(id: ScenarioGraphId): number | null {
  try {
    const raw = sessionStorage.getItem(storageKey(id, "completed-at"));
    if (raw == null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function writeScenarioCompletedAt(id: ScenarioGraphId, ms: number) {
  try {
    sessionStorage.setItem(storageKey(id, "completed-at"), String(ms));
  } catch {
    /* ignore */
  }
}

export function clearScenarioCompletedAt(id: ScenarioGraphId) {
  try {
    sessionStorage.removeItem(storageKey(id, "completed-at"));
  } catch {
    /* ignore */
  }
}

/** Clears progress for a new run from preview (sequence, completion, follow-up, timestamps). */
export function resetScenarioGraphRun(id: ScenarioGraphId) {
  clearScenarioSequenceStart(id);
  clearScenarioFlowComplete(id);
  clearScenarioFollowUpChoice(id);
  clearScenarioCompletedAt(id);
}

export function computeScenarioStepStatuses(
  stepCount: number,
  sequenceStart: number,
  stepLoadMs: number,
  now: number,
): ScenarioStepStatus[] {
  const elapsed = Math.max(0, now - sequenceStart);
  const completed = Math.min(stepCount, Math.floor(elapsed / stepLoadMs));
  const statuses: ScenarioStepStatus[] = [];
  for (let i = 0; i < stepCount; i++) {
    if (i < completed) statuses.push("done");
    else if (i === completed && completed < stepCount) statuses.push("loading");
    else statuses.push("pending");
  }
  return statuses;
}

export function scenarioAllStepsDone(statuses: ScenarioStepStatus[]): boolean {
  return statuses.length > 0 && statuses.every((s) => s === "done");
}
