import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";
import { Footer } from "./Footer";
import { Finish } from "./Finish";

export const ConstraintCreateOrderToolbarItem: React.FC<{
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
        data-test="constraint-order-create"
      >
        Create Order
      </Button>
      {isOpened && (
        <TaskSimple
          title="Create order constraint"
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
