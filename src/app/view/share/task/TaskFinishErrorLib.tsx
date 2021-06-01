import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishError } from "./TaskFinishError";

export const TaskFinishErrorLib: React.FC<{
  title: React.ReactNode;
  tryAgain: () => void;
  close: () => void;
}> = ({ title, tryAgain, close }) => {
  return (
    <TaskFinishError
      title={title}
      message={
        <>
          A communication error occurred during the operation (details in the
          browser console). You can try to perform the operation again.
        </>
      }
      primaryActions={
        <Button variant="primary" onClick={tryAgain}>
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
