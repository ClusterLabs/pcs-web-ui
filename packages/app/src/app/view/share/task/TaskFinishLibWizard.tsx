import React from "react";
import {WizardContextConsumer} from "@patternfly/react-core";

import {TaskFinishLib} from "./TaskFinishLib";

type TaskFinishLibProps = React.ComponentProps<typeof TaskFinishLib>;

export const TaskFinishLibWizard = ({
  response,
  taskName,
  proceedForce,
  backToUpdateSettingsStepName,
  reports,
  success,
  tryAgainStepName = "Review",
}: {
  response: TaskFinishLibProps["response"];
  taskName: TaskFinishLibProps["taskName"];
  proceedForce?: TaskFinishLibProps["proceedForce"];
  reports: TaskFinishLibProps["reports"];
  backToUpdateSettingsStepName: string;
  tryAgainStepName?: string;
  success: TaskFinishLibProps["success"];
}) => {
  return (
    <WizardContextConsumer>
      {({goToStepByName}) => (
        <TaskFinishLib
          response={response}
          success={success}
          taskName={taskName}
          backToUpdateSettings={() =>
            goToStepByName(backToUpdateSettingsStepName)
          }
          proceedForce={proceedForce}
          tryAgain={() => goToStepByName(tryAgainStepName)}
          reports={reports}
        />
      )}
    </WizardContextConsumer>
  );
};
