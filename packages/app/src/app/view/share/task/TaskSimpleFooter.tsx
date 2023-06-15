import React from "react";

import {TaskButtonNextWithValidation} from "./TaskButtonNextWithValidation";
import {TaskButtonCancel} from "./TaskButtonCancel";

export const TaskSimpleFooter = ({
  run,
  nextIf = true,
  nextDisabled = false,
  runLabel = "Create",
}: {
  run: () => void;
  runLabel?: React.ComponentProps<
    typeof TaskButtonNextWithValidation
  >["children"];
  nextIf?: boolean;
  nextDisabled?: boolean;
}) => {
  return (
    <>
      <TaskButtonNextWithValidation
        run={run}
        runIf={nextIf}
        disabled={nextDisabled}
      >
        {runLabel}
      </TaskButtonNextWithValidation>
      <TaskButtonCancel />
    </>
  );
};
