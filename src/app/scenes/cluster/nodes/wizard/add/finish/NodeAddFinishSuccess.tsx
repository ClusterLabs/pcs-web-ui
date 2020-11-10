import React from "react";
import { Button } from "@patternfly/react-core";

import { WizardLibReports, WizardSuccess } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddFinishSuccess: React.FC = () => {
  const {
    state: { nodeName, reports },
    close,
    nodeStart,
  } = useWizard();
  return (
    <>
      <WizardSuccess
        title={`Node "${nodeName}" added successfully`}
        primaryActions={
          <Button
            variant="primary"
            onClick={() => {
              close();
              nodeStart();
            }}
          >
            Start node and close
          </Button>
        }
        secondaryActions={
          <Button variant="link" onClick={close}>
            Close
          </Button>
        }
      />

      <WizardLibReports reports={reports} />
    </>
  );
};
