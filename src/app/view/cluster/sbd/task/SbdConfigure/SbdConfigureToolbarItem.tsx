import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";
import { SbdConfigureTask } from "./SbdConfigureTask";

export const SbdConfigureToolbarItem = () => {
  const { open, isOpened } = useTask();

  return (
    <>
      <Button
        variant={"primary"}
        onClick={open}
        data-test="sbd-configure"
      >
        Configure SBD
      </Button>
      {isOpened && <SbdConfigureTask />}
    </>
  );
};
