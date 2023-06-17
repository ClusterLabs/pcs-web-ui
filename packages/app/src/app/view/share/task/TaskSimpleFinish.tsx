import React from "react";

import {TaskSuccess} from "./TaskSuccess";
import {TaskSuccessAction} from "./TaskSuccessAction";
import {TaskFinishError} from "./TaskFinishError";
import {TaskProgress} from "./TaskProgress";

export const TaskSimpleFinish = ({
  response,
  resultMessage,
  waitTitle,
  taskName,
  failTitle,
  tryAgain,
  recoverFromError,
}: {
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
  waitTitle: React.ReactNode;
  taskName: string;
  failTitle: React.ReactNode;
  tryAgain: () => void;
  recoverFromError?: () => void;
}) => {
  switch (response) {
    case "sending":
      return <TaskProgress title={waitTitle} />;

    case "ok":
      return (
        <TaskSuccess
          taskName={taskName}
          primaryAction={<TaskSuccessAction />}
        />
      );

    default: {
      return (
        <TaskFinishError
          title={failTitle}
          message={resultMessage}
          {...(recoverFromError
            ? {
                primaryAction: ["Start from the beginning", recoverFromError],
                secondaryActions: {"Try again": tryAgain},
              }
            : {
                primaryAction: ["Try again", tryAgain],
              })}
        />
      );
    }
  }
};
