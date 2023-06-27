import {WizardContextConsumer} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  TaskFinishError,
  TaskProgress,
  TaskResultAction,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

const {success} = testMarks.importExistingCluster;

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
            <TaskSuccess
              primaryAction={<TaskResultAction {...success.close.mark} />}
              {...success.mark}
            />
          )}
        </>
      )}
    </WizardContextConsumer>
  );
};
