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
    createLocation,
    recoverFromError,
    state: {
      call: { response, resultMessage },
    },
  } = useTask();
  switch (response) {
    case "sending":
      return <EmptyStateSpinner title="Creating location constraint" />;
    case "ok":
      return (
        <TaskSuccess
          title={"Location created successfully"}
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
          title={"Create location constraint failed"}
          message={resultMessage}
          primaryActions={
            <Button variant="primary" onClick={recoverFromError}>
              Start from the beginning
            </Button>
          }
          secondaryActions={
            <>
              <Button variant="link" onClick={createLocation}>
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
