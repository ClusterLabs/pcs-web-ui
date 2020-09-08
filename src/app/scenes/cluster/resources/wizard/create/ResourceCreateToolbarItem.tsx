import React from "react";
import { Button } from "@patternfly/react-core";

import { ResourceCreate } from "./ResourceCreate";
import { useWizard } from "./useWizard";

export const ResourceCreateToolbarItem: React.FC = () => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button variant="primary" onClick={open} data-test="resource-create">
        Create Resource
      </Button>
      {isOpened && <ResourceCreate />}
    </>
  );
};
