import { useCallback, useEffect, useMemo, useState } from "react";

import {
  SCENARIO_GRAPH_ROUTE,
  type ScenarioGraphId,
  type ScenarioStepStatus,
  computeScenarioStepStatuses,
  readScenarioFlowComplete,
  readScenarioFollowUpChoice,
  readScenarioSequenceStart,
  resetScenarioGraphRun,
  scenarioAllStepsDone,
  writeScenarioCompletedAt,
  writeScenarioFlowComplete,
  writeScenarioFollowUpChoice,
  writeScenarioSequenceStart,
} from "../scenarioGraphStorage";
import {
  type GraphNavPath,
  writeLastCompletedGraphNav,
} from "../graphNavPath";

export type UseScenarioGraphRunOptions = {
  id: ScenarioGraphId;
  stepCount: number;
  stepLoadMs: number;
  fromScenarioPreview: boolean;
};

export function useScenarioGraphRun({
  id,
  stepCount,
  stepLoadMs,
  fromScenarioPreview,
}: UseScenarioGraphRunOptions) {
  const initial = useMemo(() => {
    if (readScenarioFlowComplete(id)) {
      const storedFollow = readScenarioFollowUpChoice(id);
      return {
        stepStatuses: Array.from({ length: stepCount }, () => "done" as ScenarioStepStatus),
        showFollowUp: false,
        followUpChoice: storedFollow,
      };
    }

    if (fromScenarioPreview) {
      resetScenarioGraphRun(id);
      const start = Date.now();
      writeScenarioSequenceStart(id, start);
      return {
        stepStatuses: computeScenarioStepStatuses(
          stepCount,
          start,
          stepLoadMs,
          start,
        ),
        showFollowUp: false,
        followUpChoice: null as string | null,
      };
    }

    let seq = readScenarioSequenceStart(id);
    if (seq == null) {
      seq = Date.now();
      writeScenarioSequenceStart(id, seq);
    }

    const statuses = computeScenarioStepStatuses(
      stepCount,
      seq,
      stepLoadMs,
      Date.now(),
    );
    const allDone = scenarioAllStepsDone(statuses);
    const storedFollow = readScenarioFollowUpChoice(id);

    return {
      stepStatuses: statuses,
      showFollowUp: allDone && storedFollow == null,
      followUpChoice: storedFollow,
    };
  }, [fromScenarioPreview, id, stepCount, stepLoadMs]);

  const [stepStatuses, setStepStatuses] = useState<ScenarioStepStatus[]>(
    () => initial.stepStatuses,
  );
  const [showFollowUp, setShowFollowUp] = useState(initial.showFollowUp);
  const [followUpChoice, setFollowUpChoice] = useState<string | null>(
    initial.followUpChoice,
  );

  useEffect(() => {
    if (readScenarioFlowComplete(id)) return;

    let sequenceStart = readScenarioSequenceStart(id);
    if (sequenceStart == null) {
      sequenceStart = Date.now();
      writeScenarioSequenceStart(id, sequenceStart);
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const advanceFrom = (index: number) => {
      if (index >= stepCount) {
        setShowFollowUp(true);
        return;
      }
      const endMs = sequenceStart + (index + 1) * stepLoadMs;
      const remaining = Math.max(0, endMs - Date.now());
      timeouts.push(
        window.setTimeout(() => {
          setStepStatuses((prev) => {
            const next = [...prev] as ScenarioStepStatus[];
            next[index] = "done";
            if (index + 1 < stepCount) next[index + 1] = "loading";
            return next;
          });
          advanceFrom(index + 1);
        }, remaining),
      );
    };

    const snapshot = computeScenarioStepStatuses(
      stepCount,
      sequenceStart,
      stepLoadMs,
      Date.now(),
    );
    const loadingIdx = snapshot.findIndex((s) => s === "loading");

    if (loadingIdx !== -1) {
      advanceFrom(loadingIdx);
    } else if (!scenarioAllStepsDone(snapshot)) {
      advanceFrom(0);
    } else {
      setShowFollowUp(readScenarioFollowUpChoice(id) == null);
    }

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount snapshot + stored sequence; mirrors GraphPage scheduling
  }, [id, stepCount, stepLoadMs]);

  useEffect(() => {
    if (!scenarioAllStepsDone(stepStatuses)) return;
    if (followUpChoice != null) return;
    setShowFollowUp(true);
  }, [stepStatuses, followUpChoice]);

  const resolveFollowUp = useCallback(
    (choice: string) => {
      writeScenarioFollowUpChoice(id, choice);
      writeScenarioFlowComplete(id);
      const completedAt = Date.now();
      writeScenarioCompletedAt(id, completedAt);
      writeLastCompletedGraphNav(
        SCENARIO_GRAPH_ROUTE[id] as GraphNavPath,
        completedAt,
      );
      setFollowUpChoice(choice);
      setShowFollowUp(false);
    },
    [id],
  );

  const headerStatus =
    followUpChoice != null
      ? "Complete"
      : showFollowUp
        ? "Almost done"
        : "Running";

  return {
    stepStatuses,
    showFollowUp: showFollowUp && followUpChoice == null,
    followUpChoice,
    resolveFollowUp,
    headerStatus,
  };
}
