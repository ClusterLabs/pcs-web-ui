import React from "react";
import { Button } from "@patternfly/react-core";

import {
  EmptyStateSpinner,
  TaskFinishError,
  TaskSuccess,
} from "app/view/share";

import { useTask } from "./useTask";
export const Finish: React.FC = () => {
  const {
    close,
    createOrder,
    recoverFromError,
    state: {
      call: { response, resultMessage },
    },
  } = useTask();
  switch (response) {
    case "sending":
      return <EmptyStateSpinner title="Creating order constraint" />;
    case "ok":
      return (
        <TaskSuccess
          title={"Order created successfully"}
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
          title={"Create order constraint failed"}
          message={resultMessage}
          primaryActions={
            <Button variant="primary" onClick={recoverFromError}>
              Start from the beginning
            </Button>
          }
          secondaryActions={
            <>
              <Button variant="link" onClick={createOrder}>
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
