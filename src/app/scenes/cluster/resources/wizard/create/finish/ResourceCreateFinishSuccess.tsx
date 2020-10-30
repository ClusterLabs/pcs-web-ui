import React from "react";
import { Button } from "@patternfly/react-core";

import { WizardLibReports, WizardSuccess } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateFinishSuccess: React.FC = () => {
  const {
    state: { resourceName, reports },
    close,
  } = useWizard();
  return (
    <>
      <WizardSuccess title={`Resource "${resourceName}" created successfully`}>
        <Button variant="primary" onClick={close}>
          Close
        </Button>
      </WizardSuccess>
      <WizardLibReports reports={reports} />
    </>
  );
};
