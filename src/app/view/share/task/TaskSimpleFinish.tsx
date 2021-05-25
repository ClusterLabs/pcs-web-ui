import React from "react";
import { Button } from "@patternfly/react-core";

import { EmptyStateSpinner } from "app/view/share/emptyState";

import { TaskSuccess } from "./TaskSuccess";
import { TaskFinishError } from "./TaskFinishError";

export const TaskSimpleFinish: React.FC<{
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
  waitTitle: React.ReactNode;
  successTitle: React.ReactNode;
  failTitle: React.ReactNode;
  close: () => void;
  tryAgain: () => void;
  recoverFromError: () => void;
}> = ({
  response,
  resultMessage,
  waitTitle,
  successTitle,
  failTitle,
  close,
  tryAgain,
  recoverFromError,
}) => {
  switch (response) {
    case "sending":
      return <EmptyStateSpinner title={waitTitle} />;
    case "ok":
      return (
        <TaskSuccess
          title={successTitle}
          primaryActions={
            <Button variant="primary" onClick={close}>
              Close
            </Button>
          }
        />
      );
    default:
      return (
        <TaskFinishError
          title={failTitle}
          message={resultMessage}
          primaryActions={
            <Button variant="primary" onClick={recoverFromError}>
              Start from the beginning
            </Button>
          }
          secondaryActions={
            <>
              <Button variant="link" onClick={tryAgain}>
                Try again
              </Button>
              <Button variant="link" onClick={close}>
                Cancel
              </Button>
            </>
          }
        />
      );
  }
};
