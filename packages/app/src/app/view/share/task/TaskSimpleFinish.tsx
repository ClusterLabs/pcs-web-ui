import React from "react";

import {TaskSuccess} from "./TaskSuccess";
import {TaskButtonResult} from "./button";
import {TaskFinishError} from "./TaskFinishError";
import {TaskProgress} from "./TaskProgress";

export const TaskSimpleFinish = ({
  response,
  resultMessage,
  waitTitle,
  failTitle,
  tryAgain,
  recoverFromError,
}: {
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
  waitTitle: React.ReactNode;
  failTitle: React.ReactNode;
  tryAgain: () => void;
  recoverFromError?: () => void;
}) => {
  switch (response) {
    case "sending":
      return <TaskProgress title={waitTitle} />;

    case "ok":
      return <TaskSuccess primaryAction={<TaskButtonResult />} />;

    default: {
      const cancel = <TaskButtonResult variant="secondary" label="Cancel" />;
      if (recoverFromError) {
        return (
          <TaskFinishError
            title={failTitle}
            message={resultMessage}
            primaryAction={
              <TaskButtonResult
                label="Start from the beginning"
                action={recoverFromError}
              />
            }
            secondaryActions={
              <>
                <TaskButtonResult
                  variant="secondary"
                  label="Try again"
                  action={tryAgain}
                />
                {cancel}
              </>
            }
          />
        );
      }
      return (
        <TaskFinishError
          title={failTitle}
          message={resultMessage}
          primaryAction={
            <TaskButtonResult label="Try again" action={tryAgain} />
          }
          secondaryActions={cancel}
        />
      );
    }
  }
};
