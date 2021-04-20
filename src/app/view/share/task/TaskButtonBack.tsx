import React from "react";
import { Button } from "@patternfly/react-core";

export const TaskButtonBack: React.FC<{
  onClick: () => void;
  disabled?: boolean;
}> = ({ onClick, disabled = false }) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
      data-test="task-back"
    >
      Back
    </Button>
  );
};
