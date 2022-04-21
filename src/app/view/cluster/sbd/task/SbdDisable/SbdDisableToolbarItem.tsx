import { Button } from "@patternfly/react-core";

import { SbdDisableTask } from "./SbdDisableTask";
import { useTask } from "./useTask";

export const SbdDisableToolbarItem = () => {
  const { open, isOpened } = useTask();

  return (
    <>
      <Button variant={"primary"} onClick={open} data-test="sbd-disable">
        Disable SBD
      </Button>
      {isOpened && <SbdDisableTask />}
    </>
  );
};
