import {WizardContextConsumer} from "@patternfly/react-core";

import {
  TaskFinishError,
  TaskProgress,
  TaskResultAction,
  TaskSuccess,
} from "app/view/share";

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
              primaryAction={
                <TaskResultAction
                  label="Change settings"
                  action={() => goToStepByName(backToUpdateSettingsStepName)}
                />
              }
              secondaryActions={
                <TaskResultAction
                  variant="secondary"
                  label="Try again"
                  action={importCluster}
                />
              }
            />
          )}
          {importCall.status === "success" && (
            <TaskSuccess primaryAction={<TaskResultAction />} />
          )}
        </>
      )}
    </WizardContextConsumer>
  );
};
