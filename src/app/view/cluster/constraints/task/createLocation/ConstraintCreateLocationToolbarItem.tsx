import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";
import { Finish } from "./Finish";
import { Footer } from "./Footer";

export const ConstraintCreateLocationToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    isOpened,
    state: {
      call: { response },
    },
  } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-location-create"
      >
        Create Location
      </Button>
      {isOpened && (
        <TaskSimple
          title="Create location constraint"
          close={close}
          footer={<Footer />}
        >
          {response === "" && <Configure />}
          {response !== "" && <Finish />}
        </TaskSimple>
      )}
    </>
  );
};
