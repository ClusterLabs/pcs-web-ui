import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReports,
  TaskResultAction,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
  TaskResultActionWizardBack,
  TaskResultActionWizardTryAgain,
  TaskResultLib,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

export const Result = ({
  backStep,
  reviewStep,
}: {
  backStep: string;
  reviewStep: string;
}) => {
  const {
    startClusterAndClose,
    setupCluster,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
  const {success, unsuccess, communicationError} = testMarks.setupCluster;
  return (
    <TaskResultLib
      response={response}
      success={
        <TaskSuccess
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
      unsuccess={
        <TaskFinishLibUnsuccess
          reports={reports}
          back={
            <TaskResultActionWizardBack
              stepName={backStep}
              {...unsuccess.back.mark}
            />
          }
          proceed={
            <TaskResultActionProceedAnyway
              action={() => setupCluster({force: true})}
              {...unsuccess.proceedAnyway.mark}
            />
          }
          cancel={<TaskResultActionCancel {...unsuccess.cancel.mark} />}
          {...unsuccess.mark}
        />
      }
      reports={<TaskLibReports reports={reports} />}
      communicationError={
        <TaskFinishLibCommunicationError
          tryAgain={
            <TaskResultActionWizardTryAgain
              stepName={reviewStep}
              {...communicationError.tryAgain.mark}
            />
          }
          cancel={<TaskResultActionCancel />}
          {...communicationError.mark}
        />
      }
    />
  );
};
