import React from "react";

import {TaskButtonCancel, TaskButtonNext} from "./button";
import {useTaskContext} from "./TaskContext";

export const TaskSimpleFooter = ({
  run,
  nextIf = true,
  nextDisabled = false,
  runLabel,
}: {
  run: () => void;
  runLabel?: React.ComponentProps<typeof TaskButtonNext>["children"];
  nextIf?: boolean;
  nextDisabled?: boolean;
}) => {
  const {taskLabel} = useTaskContext();
  return (
    <>
      <TaskButtonNext run={run} runIf={nextIf} disabled={nextDisabled}>
        {runLabel ?? taskLabel}
      </TaskButtonNext>
      <TaskButtonCancel />
    </>
  );
};
