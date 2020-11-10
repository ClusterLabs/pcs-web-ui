import React from "react";
import { Button } from "@patternfly/react-core";

export const WizardButtonCancel: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Button variant="link" onClick={onClick} data-test="wizard-cancel">
      Cancel
    </Button>
  );
};
