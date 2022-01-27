import { WizardContextConsumer } from "@patternfly/react-core";
import React from "react";

import { TaskFinishError, TaskProgress, TaskSuccess } from "app/view/share";

import { useTask } from "./useTask";

export const TaskFinish: React.FC = () => {
  const {
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
              primaryAction={["Try again", () => console.log("TODO")]}
            />
          )}
          {importCall.status === "success" && (
            <TaskSuccess title={"Cluster has been added sucessfully"} />
          )}
        </>
      )}
    </WizardContextConsumer>
  );
};
