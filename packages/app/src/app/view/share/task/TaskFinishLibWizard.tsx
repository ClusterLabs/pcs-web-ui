import React from "react";

import {TaskResultLib} from "./TaskResultLib";
import {TaskFinishLibUnsuccess} from "./TaskFinishLibUnsuccess";
import {TaskResultActionWizardBack} from "./TaskResultActionWizardBack";
import {TaskFinishLibCommunicationError} from "./TaskFinishLibCommunicationError";
import {TaskResultActionWizardTryAgain} from "./TaskResultActionWizardTryAgain";
import {TaskResultActionCancel} from "./TaskResultActionCancel";
import {TaskResultActionProceedAnyway} from "./TaskResultActionProceedAnyway";

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
            <TaskResultActionWizardBack
              stepName={backToUpdateSettingsStepName}
              data-test="task-back"
            />
          }
          proceed={
            proceedForce && (
              <TaskResultActionProceedAnyway action={proceedForce} />
            )
          }
          cancel={<TaskResultActionCancel />}
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
          cancel={<TaskResultActionCancel />}
        />
      }
    />
  );
};
