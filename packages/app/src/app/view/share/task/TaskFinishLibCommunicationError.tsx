import type React from "react";
import {TaskFinishError} from "./TaskFinishError";
import {useTaskContext} from "./TaskContext";

export const TaskFinishLibCommunicationError = (props: {
  tryAgain: React.ReactNode;
  cancel: React.ReactNode;
  "data-test"?: string;
}) => {
  const {taskLabel} = useTaskContext();
  return (
    <TaskFinishError
      title={`Communication error during task "${taskLabel}"`}
      message={
        <>
          A communication error occurred during the operation (details in the
          browser console). You can try to perform the operation again.
        </>
      }
      primaryAction={props.tryAgain}
      secondaryActions={props.cancel}
      data-test={props["data-test"]}
    />
  );
};
