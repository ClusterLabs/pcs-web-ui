import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibWizard,
  TaskResultAction,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

export const Result = () => {
  const {
    startClusterAndClose,
    setupCluster,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
  const {success} = testMarks.setupCluster;
  return (
    <TaskFinishLibWizard
      response={response}
      taskName="setup new cluster"
      backToUpdateSettingsStepName="Cluster name and nodes"
      proceedForce={() => setupCluster({force: true})}
      success={
        <TaskSuccess
          taskName={"setup new cluster"}
          primaryAction={<TaskResultAction {...success.close.mark} />}
          secondaryActions={
            <TaskResultAction
              variant="secondary"
              action={startClusterAndClose}
              label="Start cluster and close"
              {...success.startAndClose.mark}
            />
          }
          {...success.mark}
        />
      }
      reports={reports}
    />
  );
};
