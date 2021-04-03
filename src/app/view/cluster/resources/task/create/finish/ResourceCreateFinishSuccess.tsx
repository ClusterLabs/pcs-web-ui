import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskLibReports, TaskSuccess } from "app/view/share";

import { useTask } from "../useTask";

export const ResourceCreateFinishSuccess: React.FC = () => {
  const {
    state: { resourceName, reports },
    close,
  } = useTask();
  return (
    <>
      <TaskSuccess
        title={`Resource "${resourceName}" created successfully`}
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
