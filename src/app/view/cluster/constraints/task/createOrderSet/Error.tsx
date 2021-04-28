import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishError } from "app/view/share";

import { useTask } from "./useTask";

export const Error: React.FC = () => {
  const {
    wizard: { goToStepByName },
    close,
  } = useTask();
  return (
    <TaskFinishError
      title="Communication error while creating the order constraint"
      message={
        <>
          A communication error occurred while creating the order constraint
          (details in the browser console). You can try to perform the operation
          again.
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
