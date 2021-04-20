import React from "react";
import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";
import { ResourceCreateGroup } from "./ResourceCreateGroup";

export const ResourcCreateGroupToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="resource-add-to-group"
      >
        Create group
      </Button>
      {isOpened && <ResourceCreateGroup />}
    </>
  );
};
