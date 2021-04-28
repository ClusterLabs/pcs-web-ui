import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskLibReports, TaskSuccess } from "app/view/share";

import { useTask } from "./useTask";

export const Success: React.FC = () => {
  const {
    state: { reports },
    close,
  } = useTask();
  return (
    <>
      <TaskSuccess
        title={"Constraint has been created successfully"}
        primaryActions={
          <Button variant="primary" onClick={close}>
            Close
          </Button>
        }
      />
      <TaskLibReports reports={reports} />
    </>
  );
};
