import {WizardContextConsumer} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  TaskFinishError,
  TaskProgress,
  TaskResultAction,
  TaskResultActionCancel,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

const {success, error} = testMarks.task.importExistingCluster;

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
                  {...error.changeSettings.mark}
                />
              }
              secondaryActions={
                <>
                  <TaskResultAction
                    variant="link"
                    label="Try again"
                    action={importCluster}
                    {...error.tryAgain.mark}
                  />
                  <TaskResultActionCancel
                    variant="link"
                    {...error.cancel.mark}
                  />
                </>
              }
              {...error.mark}
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
