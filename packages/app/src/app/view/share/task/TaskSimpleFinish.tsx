import React from "react";

import {TaskSuccess} from "./TaskSuccess";
import {TaskFinishError} from "./TaskFinishError";
import {TaskProgress} from "./TaskProgress";

export const TaskSimpleFinish = ({
  response,
  resultMessage,
  waitTitle,
  successTitle,
  failTitle,
  tryAgain,
  recoverFromError,
}: {
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
  waitTitle: React.ReactNode;
  successTitle: React.ReactNode;
  failTitle: React.ReactNode;
  tryAgain: () => void;
  recoverFromError?: () => void;
}) => {
  switch (response) {
    case "sending":
      return <TaskProgress title={waitTitle} />;

    case "ok":
      return <TaskSuccess title={successTitle} />;

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
