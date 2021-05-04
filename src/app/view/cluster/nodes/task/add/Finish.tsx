import React from "react";
import { Button } from "@patternfly/react-core";

import {
  TaskFinishErrorLib,
  TaskProgress,
  TaskSuccessLib,
} from "app/view/share";

import { useTask } from "./useTask";
import { Fail } from "./Fail";

export const Finish: React.FC = () => {
  const {
    close,
    nodeStart,
    state: { reports, response, nodeName },
    wizard: { goToStepByName },
  } = useTask();
  switch (response) {
    case "success":
      return (
        <TaskSuccessLib
          title={`Node "${nodeName}" added successfully`}
          close={() => {
            close();
            nodeStart();
          }}
          closeLabel="Start node and close"
          secondaryActions={
            <Button variant="link" onClick={close}>
              Close
            </Button>
          }
          reports={reports}
        />
      );
    case "fail":
      return <Fail />;
    case "communication-error":
      return (
        <TaskFinishErrorLib
          title={
            <>Communication error while adding the node {` "${nodeName}"`}</>
          }
          tryAgain={() => goToStepByName("Review")}
          close={close}
        />
      );
    default:
      return (
        <TaskProgress
          title={`Add node "${nodeName}" progress`}
          progressTitle="Adding node"
        />
      );
  }
};
