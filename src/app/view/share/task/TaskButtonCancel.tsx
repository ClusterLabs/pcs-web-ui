import React from "react";
import { Button } from "@patternfly/react-core";

export const TaskButtonCancel: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Button variant="link" onClick={onClick} data-test="task-cancel">
      Cancel
    </Button>
  );
};
