import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const ConstraintCreateOrderToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    createOrder,
    recoverFromError,
    isOpened,
    state: {
      call: { response, resultMessage },
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
          footer={
            response !== "" ? null : (
              <TaskSimpleFooter
                run={createOrder}
                runLabel="Create order constraint"
                cancel={close}
              />
            )
          }
        >
          {response === "" && <Configure />}
          {response !== "" && (
            <TaskSimpleFinish
              response={response}
              resultMessage={resultMessage}
              waitTitle="Creating order constraint"
              successTitle="Order created successfully"
              failTitle="Create order constraint failed"
              close={close}
              tryAgain={createOrder}
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
