import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReport,
  TaskLibReportList,
  TaskResultAction,
  TaskResultActionCancel,
  TaskResultActionWizardBack,
  TaskResultActionWizardTryAgain,
  TaskResultLib,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

const {success, unsuccess, communicationError} = testMarks.task.aclRoleCreate;

export const Result = ({
  backStep,
  reviewStep,
}: {
  backStep: string;
  reviewStep: string;
}) => {
  const {
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
              {...testMarks.task.aclRoleCreate.report.mark}
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
