import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishError } from "app/view/share";

import { useTask } from "./useTask";

export const Error: React.FC = () => {
  const {
    state: { resourceName },
    wizard: { goToStepByName },
    close,
  } = useTask();
  return (
    <TaskFinishError
      title={
        <>
          Communication error while creating the resource
          {` "${resourceName}"`}
        </>
      }
      message={
        <>
          A communication error occurred while creating the resource (details in
          the browser console). You can try to perform the operation again.
        </>
      }
      primaryActions={
        <Button variant="primary" onClick={() => goToStepByName("Review")}>
          Try again
        </Button>
      }
      secondaryActions={
        <Button variant="link" onClick={close}>
          Cancel
        </Button>
      }
    />
  );
};
