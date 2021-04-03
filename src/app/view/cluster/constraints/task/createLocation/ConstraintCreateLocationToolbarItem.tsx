import React from "react";
import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";
import { ConstraintCreateLocation } from "./ConstraintCreateLocation";

export const ConstraintCreateLocationToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-location-create"
      >
        Create Location
      </Button>
      {isOpened && <ConstraintCreateLocation />}
    </>
  );
};
