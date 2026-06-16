import type React from "react";
import {TaskFinishError} from "./TaskFinishError";
import {useTaskContext} from "./TaskContext";

export const TaskFinishLibPermissionDenied = (props: {
  tryAgain: React.ReactNode;
  cancel: React.ReactNode;
  "data-test"?: string;
}) => {
  const {taskLabel} = useTaskContext();
  return (
    <TaskFinishError
      title={`Permission denied for task "${taskLabel}"`}
      message="You do not have sufficient permissions to perform this operation."
      primaryAction={props.tryAgain}
      secondaryActions={props.cancel}
      data-test={props["data-test"]}
    />
  );
};
