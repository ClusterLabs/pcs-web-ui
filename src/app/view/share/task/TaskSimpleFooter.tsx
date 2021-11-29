import React from "react";
import { Button } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useDispatch } from "app/view/share/useDispatch";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";

export const TaskSimpleFooter: React.FC<{
  run: () => void;
  task: Parameters<typeof selectors.getClusterTask>[0];
  cancel: () => void;
  runLabel?: string;
  nextIf?: boolean;
}> = ({ run, cancel, task, nextIf = true, runLabel = "Create" }) => {
  const clusterName = useSelectedClusterName();
  const dispatch = useDispatch();
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          if (nextIf) {
            dispatch({
              type: "TASK.VALIDATION.HIDE",
              key: { clusterName, task },
            });
            run();
            return;
          }
          dispatch({
            type: "TASK.VALIDATION.SHOW",
            key: { clusterName, task },
          });
        }}
        data-test="task-footer-run"
      >
        {runLabel}
      </Button>
      <Button variant="link" onClick={cancel} data-test="task-footer-cancel">
        Cancel
      </Button>
    </>
  );
};
