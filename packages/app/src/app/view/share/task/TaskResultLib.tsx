import React from "react";

import {TaskProgress} from "./TaskProgress";

export const TaskResultLib = (
  props: {
    response:
      | "no-response"
      | "success"
      | "forceable-fail"
      | "fail"
      | "communication-error"
      | "progress";
    success: React.ReactNode;
    libraryFail: React.ReactNode;
    communicationError: React.ReactNode;
    reports: React.ReactNode;
  } & ({progress: React.ReactNode} | {taskName: string}),
) => {
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
          {props.libraryFail}
          {props.reports}
        </>
      );

    case "communication-error":
      return <>props.communicationError</>;

    default:
      return "progress" in props ? (
        <>props.progress</>
      ) : (
        <TaskProgress title={`Processing task "${props.taskName}".`} />
      );
  }
};
