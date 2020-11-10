import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { NodeAdd } from "./NodeAdd";

export const NodeAddToolbarItem: React.FC = () => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button variant="primary" onClick={open} data-test="node-add">
        Add node
      </Button>
      {isOpened && <NodeAdd />}
    </>
  );
};
