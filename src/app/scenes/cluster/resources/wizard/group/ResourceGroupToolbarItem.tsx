import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { ResourceGroup } from "./ResourceGroup";

export const ResourceGroupToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button variant={variant} onClick={open} data-test="resource-create">
        Group Resources
      </Button>
      {isOpened && <ResourceGroup />}
    </>
  );
};
