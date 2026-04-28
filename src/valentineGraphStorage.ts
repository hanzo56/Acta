/**
 * Isolated from dinner `graphFlowStorage` so the Valentine scenario doesn’t
 * clobber the Tori Tori / dinner orchestration state.
 */
export const VALENTINE_FLOW_STORAGE_KEY = 'acta-valentine-flow-complete'
const VALENTINE_STEP_TIMES_KEY = 'acta-valentine-step-times'
const VALENTINE_SEQUENCE_START_KEY = 'acta-valentine-sequence-start'
const VALENTINE_STEP_TITLES_KEY = 'acta-valentine-completed-step-titles'

export function readValentineFlowComplete(): boolean {
  try {
    return sessionStorage.getItem(VALENTINE_FLOW_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeValentineFlowComplete() {
  try {
    sessionStorage.setItem(VALENTINE_FLOW_STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function clearValentineFlowComplete() {
  try {
    sessionStorage.removeItem(VALENTINE_FLOW_STORAGE_KEY)
    sessionStorage.removeItem(VALENTINE_STEP_TIMES_KEY)
    sessionStorage.removeItem(VALENTINE_SEQUENCE_START_KEY)
    sessionStorage.removeItem(VALENTINE_STEP_TITLES_KEY)
  } catch {
    /* ignore */
  }
}

export function readValentineSequenceStart(): number | null {
  try {
    const raw = sessionStorage.getItem(VALENTINE_SEQUENCE_START_KEY)
    if (raw == null) return null
    const n = Number(raw)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

export function writeValentineSequenceStart(ms: number) {
  try {
    sessionStorage.setItem(VALENTINE_SEQUENCE_START_KEY, String(ms))
  } catch {
    /* ignore */
  }
}

export function readValentineStepTimes(expectedLen: number): number[] | null {
  try {
    const raw = sessionStorage.getItem(VALENTINE_STEP_TIMES_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length !== expectedLen) return null
    if (!parsed.every((n) => typeof n === 'number' && Number.isFinite(n))) return null
    return parsed as number[]
  } catch {
    return null
  }
}

export function writeValentineStepTimes(timestamps: number[]) {
  try {
    sessionStorage.setItem(VALENTINE_STEP_TIMES_KEY, JSON.stringify(timestamps))
  } catch {
    /* ignore */
  }
}

/**
 * For Tasks list — full step labels after the run completes. Cleared on restart from preview.
 */
export function readValentineCompletedStepTitles(): string[] | null {
  try {
    const raw = sessionStorage.getItem(VALENTINE_STEP_TITLES_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || !parsed.every((s) => typeof s === 'string')) return null
    return parsed as string[]
  } catch {
    return null
  }
}

export function writeValentineCompletedStepTitles(titles: string[]) {
  try {
    sessionStorage.setItem(VALENTINE_STEP_TITLES_KEY, JSON.stringify(titles))
  } catch {
    /* ignore */
  }
}

