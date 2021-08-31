import React from "react";
import { Button } from "@patternfly/react-core";

import { FenceDeviceCreate } from "./FenceDeviceCreate";
import { useTask } from "./useTask";

export const FenceDeviceCreateToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useTask();
  return (
    <>
      <Button variant={variant} onClick={open} data-test="fence-device-create">
        Create fence device
      </Button>
      {isOpened && <FenceDeviceCreate />}
    </>
  );
};
