import React from "react";
import { Button } from "@patternfly/react-core";

import { WizardFinishError } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddFinishError: React.FC = () => {
  const {
    state: { nodeName },
    wizard: { goToStepByName },
    close,
  } = useWizard();
  return (
    <WizardFinishError
      title={<>Communication error while adding the node {` "${nodeName}"`}</>}
      message={
        <>
          A communication error occurred while adding node (details in the
          browser console). You can try to perform the operation again.
        </>
      }
      primaryActions={
        <Button variant="primary" onClick={() => goToStepByName("Review")}>
          Try again
        </Button>
      }
      secondaryActions={
        <Button variant="link" onClick={close}>
          Cancel
        </Button>
      }
    />
  );
};
