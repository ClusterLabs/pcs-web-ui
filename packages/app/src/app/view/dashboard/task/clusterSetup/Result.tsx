import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReport,
  TaskLibReportList,
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
  const {success, unsuccess, communicationError, reportList} =
    testMarks.setupCluster;
  return (
    <TaskResultLib
      response={response}
      reports={
        <TaskLibReportList
          reports={reports}
          renderReport={(report, i) => (
            <TaskLibReport
              key={i}
              report={report}
              {...reportList.report.mark}
            />
          )}
          {...reportList.mark}
        />
      }
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
