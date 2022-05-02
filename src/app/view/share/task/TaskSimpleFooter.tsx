import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskButtonNextWithValidation } from "./TaskButtonNextWithValidation";
import { useTaskContext } from "./TaskContext";

export const TaskSimpleFooter = ({
  run,
  nextIf = true,
  runLabel = "Create",
}: {
  run: () => void;
  runLabel?: React.ComponentProps<
    typeof TaskButtonNextWithValidation
  >["children"];
  nextIf?: boolean;
}) => {
  const { close } = useTaskContext();
  return (
    <>
      <TaskButtonNextWithValidation run={run} runIf={nextIf}>
        {runLabel}
      </TaskButtonNextWithValidation>
      <Button variant="link" onClick={close} data-test="task-footer-cancel">
        Cancel
      </Button>
    </>
  );
};
