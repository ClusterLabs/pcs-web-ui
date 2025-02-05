import type React from "react";

import {
  TaskButtonResultCancel,
  TaskButtonResultProceedAnyway,
  TaskButtonWizardResultBack,
  TaskResultActionWizardTryAgain,
} from "./button";
import {TaskResultLib} from "./TaskResultLib";
import {TaskFinishLibUnsuccess} from "./TaskFinishLibUnsuccess";
import {TaskFinishLibCommunicationError} from "./TaskFinishLibCommunicationError";

export const TaskFinishLibWizard = ({
  response,
  proceedForce,
  backToUpdateSettingsStepName,
  reports,
  success,
  tryAgainStepName = "Review",
}: {
  response: React.ComponentProps<typeof TaskResultLib>["response"];
  proceedForce?: () => void;
  reports: React.ComponentProps<typeof TaskFinishLibUnsuccess>["reports"];
  backToUpdateSettingsStepName: string;
  tryAgainStepName?: string;
  success: React.ReactNode;
}) => {
  return (
    <TaskResultLib
      response={response}
      success={success}
      unsuccess={
        <TaskFinishLibUnsuccess
          reports={reports}
          back={
            <TaskButtonWizardResultBack
              stepName={backToUpdateSettingsStepName}
              data-test="task-back"
            />
          }
          proceed={
            proceedForce && (
              <TaskButtonResultProceedAnyway action={proceedForce} />
            )
          }
          cancel={<TaskButtonResultCancel />}
        />
      }
      reports={reports}
      communicationError={
        <TaskFinishLibCommunicationError
          tryAgain={
            <TaskResultActionWizardTryAgain
              stepName={tryAgainStepName}
              data-test="task-try-again"
            />
          }
          cancel={<TaskButtonResultCancel />}
        />
      }
    />
  );
};
