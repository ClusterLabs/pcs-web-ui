import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskLibReports, TaskSuccess } from "app/view/share";

import { useTask } from "../useTask";

export const NodeAddFinishSuccess: React.FC = () => {
  const {
    state: { nodeName, reports },
    close,
    nodeStart,
  } = useTask();
  return (
    <>
      <TaskSuccess
        title={`Node "${nodeName}" added successfully`}
        primaryActions={
          <Button
            variant="primary"
            onClick={() => {
              close();
              nodeStart();
            }}
          >
            Start node and close
          </Button>
        }
        secondaryActions={
          <Button variant="link" onClick={close}>
            Close
          </Button>
        }
      />

      <TaskLibReports reports={reports} />
    </>
  );
};
