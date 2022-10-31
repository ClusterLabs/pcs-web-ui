import {WizardContextConsumer} from "@patternfly/react-core";

import {TaskFinishError, TaskProgress, TaskSuccess} from "app/view/share";

import {useTask} from "./useTask";

export const TaskFinish = ({
  backToUpdateSettingsStepName,
}: {
  backToUpdateSettingsStepName: string;
}) => {
  const {
    importCluster,
    state: {importCall},
  } = useTask();
  return (
    <WizardContextConsumer>
      {({goToStepByName}) => (
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
              primaryAction={[
                "Change settings",
                () => goToStepByName(backToUpdateSettingsStepName),
              ]}
              secondaryActions={{
                "Try again": importCluster,
              }}
            />
          )}
          {importCall.status === "success" && (
            <TaskSuccess title={"Cluster has been added successfully"} />
          )}
        </>
      )}
    </WizardContextConsumer>
  );
};
