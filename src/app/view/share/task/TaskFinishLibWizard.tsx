import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { TaskFinishLib } from "./TaskFinishLib";

type TaskFinishLibProps = React.ComponentProps<typeof TaskFinishLib>;

export const TaskFinishLibWizard: React.FC<{
  response: TaskFinishLibProps["response"];
  taskName: TaskFinishLibProps["taskName"];
  close: TaskFinishLibProps["close"];
  proceedForce: TaskFinishLibProps["proceedForce"];
  reports: TaskFinishLibProps["reports"];
  backToUpdateSettingsStepName: string;
  tryAgainStepName?: string;
  successPrimaryActions?: TaskFinishLibProps["successPrimaryActions"];
  successSecondaryActions?: TaskFinishLibProps["successSecondaryActions"];
}> = ({
  response,
  taskName,
  close,
  proceedForce,
  backToUpdateSettingsStepName,
  reports,
  successPrimaryActions,
  successSecondaryActions,
  tryAgainStepName = "Review",
}) => {
  return (
    <WizardContextConsumer>
      {({ goToStepByName }) => (
        <TaskFinishLib
          response={response}
          taskName={taskName}
          successPrimaryActions={successPrimaryActions}
          successSecondaryActions={successSecondaryActions}
          close={close}
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
