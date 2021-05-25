import React from "react";
import { Button } from "@patternfly/react-core";

export const TaskSimpleFooter: React.FC<{
  run: () => void;
  cancel: () => void;
  runLabel?: string;
}> = ({ run, cancel, runLabel = "Create" }) => {
  return (
    <>
      <Button variant="primary" onClick={run}>
        {runLabel}
      </Button>
      <Button variant="link" onClick={cancel}>
        Cancel
      </Button>
    </>
  );
};
