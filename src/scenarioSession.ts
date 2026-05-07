const PREFIX = "acta-scenario-";

export type BookDinnerScenario = {
  guest: string;
  restaurant: string;
  cuisine: string;
  when: string;
};

export type MessageTeamScenario = {
  channel: string;
  topic: string;
  tone: string;
  attachment: string;
};

export type SummarizeBriefScenario = {
  document: string;
  audience: string;
  format: string;
  sensitivity: string;
};

function readJson<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function writeBookDinnerScenario(data: BookDinnerScenario) {
  writeJson(PREFIX + "book-dinner", data);
}

export function readBookDinnerScenario(): BookDinnerScenario | null {
  const v = readJson<BookDinnerScenario>(PREFIX + "book-dinner");
  if (!v || typeof v.guest !== "string") return null;
  return v;
}

export function writeMessageTeamScenario(data: MessageTeamScenario) {
  writeJson(PREFIX + "message-team", data);
}

export function readMessageTeamScenario(): MessageTeamScenario | null {
  const v = readJson<MessageTeamScenario>(PREFIX + "message-team");
  if (!v || typeof v.channel !== "string") return null;
  return v;
}

export function writeSummarizeBriefScenario(data: SummarizeBriefScenario) {
  writeJson(PREFIX + "summarize-brief", data);
}

export function readSummarizeBriefScenario(): SummarizeBriefScenario | null {
  const v = readJson<SummarizeBriefScenario>(PREFIX + "summarize-brief");
  if (!v || typeof v.document !== "string") return null;
  return v;
}
