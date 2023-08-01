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

const {success, unsuccess, communicationError} =
  testMarks.task.fenceDeviceCreate;

export const Result = ({
  backStep,
  reviewStep,
}: {
  backStep: string;
  reviewStep: string;
}) => {
  const {
    create,
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
              {...testMarks.task.fenceDeviceCreate.report.mark}
            />
          )}
        />
      }
      success={
        <TaskSuccess
          primaryAction={<TaskResultAction {...success.close.mark} />}
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
              action={() => create({force: true})}
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
