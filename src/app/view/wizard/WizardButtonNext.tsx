import React from "react";
import { Button } from "@patternfly/react-core";

export const WizardButtonNext: React.FC<{
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}> = ({ onClick = undefined, label = "Next", disabled = false }) => {
  return (
    <Button
      variant="primary"
      type="submit"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
    >
      {label}
    </Button>
  );
};
