import React from "react";
import { Button } from "@patternfly/react-core";

export const WizardButtonBack: React.FC<{
  onClick: () => void;
  disabled?: boolean;
}> = ({ onClick, disabled = false }) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
      data-test="wizard-back"
    >
      Back
    </Button>
  );
};
