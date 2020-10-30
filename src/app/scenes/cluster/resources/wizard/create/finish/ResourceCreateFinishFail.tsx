import React from "react";
import { Button } from "@patternfly/react-core";

import { WizardFinishError, WizardLibReports } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateFinishFail: React.FC = () => {
  const {
    state: { resourceName, reports },
    wizard: { goToStepByName },
    close,
  } = useWizard();
  return (
    <>
      <WizardFinishError
        title={`Create resource "${resourceName}" failed`}
        message={
          <>
            Create resource failed in the backend (see messages below). You can
            return back, correct values and try to create resource again. The
            messages will be kept in the wizard.
          </>
        }
        primaryActions={
          <Button
            variant="primary"
            onClick={() => goToStepByName("Name and type")}
          >
            Back to first step
          </Button>
        }
        secondaryActions={
          <Button variant="link" onClick={close}>
            Cancel
          </Button>
        }
      />
      <WizardLibReports reports={reports} />
    </>
  );
};
