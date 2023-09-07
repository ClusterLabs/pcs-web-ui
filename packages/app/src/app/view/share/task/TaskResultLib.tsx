import React from "react";

import {TaskProgress} from "./TaskProgress";
import {useTaskContext} from "./TaskContext";

export const TaskResultLib = (props: {
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error"
    | "progress";
  success: React.ReactNode;
  unsuccess: React.ReactNode;
  communicationError: React.ReactNode;
  reports: React.ReactNode;
}) => {
  const {taskLabel} = useTaskContext();
  switch (props.response) {
    case "success":
      return (
        <>
          {props.success}
          {props.reports}
        </>
      );

    case "fail":
      return (
        <>
          {props.unsuccess}
          {props.reports}
        </>
      );

    case "communication-error":
      return <>props.communicationError</>;

    default:
      return <TaskProgress title={`Processing task "${taskLabel}".`} />;
  }
};
