import { Button, WizardContextConsumer } from "@patternfly/react-core";
import React from "react";

import { TaskFinishError, TaskProgress, TaskSuccess } from "app/view/share";

import { useTask } from "./useTask";

export const TaskFinish: React.FC = () => {
  const {
    close,
    state: { importCall },
  } = useTask();
  return (
    <WizardContextConsumer>
      {() => (
        <>
          {importCall.status === "started" && (
            <TaskProgress title="Adding existing cluster" />
          )}
          {importCall.status === "error" && (
            <TaskFinishError
              title="Error during adding existing cluster"
              message={
                <>
                  Error: {importCall.message}. You can try to perform the
                  operation again.
                </>
              }
              primaryActions={
                <Button variant="primary" onClick={() => console.log("TODO")}>
                  Try again
                </Button>
              }
              secondaryActions={
                <Button variant="link" onClick={close}>
                  Cancel
                </Button>
              }
            />
          )}
          {importCall.status === "success" && (
            <TaskSuccess
              title={"Cluster has been added sucessfully"}
              close={close}
            />
          )}
        </>
      )}
    </WizardContextConsumer>
  );
};
