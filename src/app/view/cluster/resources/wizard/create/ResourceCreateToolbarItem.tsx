import React from "react";
import { Button } from "@patternfly/react-core";

import { ResourceCreate } from "./ResourceCreate";
import { useWizard } from "./useWizard";

export const ResourceCreateToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button variant={variant} onClick={open} data-test="resource-create">
        Create Resource
      </Button>
      {isOpened && <ResourceCreate />}
    </>
  );
};
