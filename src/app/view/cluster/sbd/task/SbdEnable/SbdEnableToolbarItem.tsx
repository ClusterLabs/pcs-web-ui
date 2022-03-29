import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";
import { SbdEnableTask } from "./SbdEnableTask";

export const SbdEnableToolbarItem = () => {
  const { open, isOpened } = useTask();

  return (
    <>
      <Button
        variant={"primary"}
        onClick={open}
        data-test="sbd-enable"
      >
        Enable SBD
      </Button>
      {isOpened && <SbdEnableTask />}
    </>
  );
};
