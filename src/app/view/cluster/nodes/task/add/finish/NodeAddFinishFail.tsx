import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskFinishError, TaskLibReports } from "app/view/share";

import { useTask } from "../useTask";

export const NodeAddFinishFail: React.FC = () => {
  const {
    state: { nodeName, reports },
    wizard: { goToStepByName },
    close,
  } = useTask();
  return (
    <>
      <TaskFinishError
        title={`Add node "${nodeName}" failed`}
        message={
          <>
            Operation has not completed sucessfully (see messages below). You
            can return back, change settings and try again. All messages below
            will stay available.
          </>
        }
        primaryActions={
          <Button
            variant="primary"
            onClick={() => goToStepByName("Enter node name")}
          >
            Back to first step
          </Button>
        }
        secondaryActions={
          <Button variant="link" onClick={close}>
            Cancel
          </Button>
        }
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
