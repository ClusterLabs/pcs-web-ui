import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskButtonResultProceedAnyway,
  TaskButtonWizardResultBack,
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReport,
  TaskLibReportList,
  TaskResultActionWizardTryAgain,
  TaskResultLib,
  TaskSuccess,
  lib,
} from "app/view/share";

import {useTask} from "./useTask";

const {success, unsuccess, communicationError} = testMarks.task.nodeAdd;

export const Result = ({
  backStep,
  reviewStep,
}: {
  backStep: string;
  reviewStep: string;
}) => {
  const {
    close,
    nodeStart,
    nodeAdd,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
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
              {...testMarks.task.nodeAdd.report.mark}
            />
          )}
        />
      }
      success={
        <TaskSuccess
          primaryAction={<TaskButtonResult {...success.close.mark} />}
          secondaryActions={
            <TaskButtonResult
              variant="secondary"
              action={() => {
                close();
                nodeStart();
              }}
              label="Start node and close"
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
            <TaskButtonWizardResultBack
              stepName={backStep}
              {...unsuccess.back.mark}
            />
          }
          proceed={
            <TaskButtonResultProceedAnyway
              action={() =>
                nodeAdd({newForceFlags: lib.reports.getForceFlags(reports)})
              }
              {...unsuccess.proceedAnyway.mark}
            />
          }
          cancel={<TaskButtonResultCancel {...unsuccess.cancel.mark} />}
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
          cancel={<TaskButtonResultCancel />}
          {...communicationError.mark}
        />
      }
    />
  );
};
