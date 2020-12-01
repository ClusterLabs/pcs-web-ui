import React from "react";
import { Button } from "@patternfly/react-core";

import { useWizard } from "./useWizard";
import { ResourceAddToGroup } from "./ResourceAddToGroup";

export const ResourceAddToGroupToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useWizard();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="resource-add-to-group"
      >
        Add To Group
      </Button>
      {isOpened && <ResourceAddToGroup />}
    </>
  );
};
