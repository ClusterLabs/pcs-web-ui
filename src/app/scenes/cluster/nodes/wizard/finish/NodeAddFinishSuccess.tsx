import React from "react";
import { Button } from "@patternfly/react-core";

import { WizardLibReports, WizardSuccess } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddFinishSuccess: React.FC = () => {
  const {
    state: { nodeName, reports },
    close,
  } = useWizard();
  return (
    <>
      <WizardSuccess title={`Node "${nodeName}" added successfully`}>
        <Button variant="primary" onClick={close}>
          Close
        </Button>
      </WizardSuccess>

      <WizardLibReports reports={reports} />
    </>
  );
};
