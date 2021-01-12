import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { NodeAdd } from "./NodeAdd";

export const NodeAddToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button variant={variant} onClick={open} data-test="node-add">
        Add node
      </Button>
      {isOpened && <NodeAdd />}
    </>
  );
};
