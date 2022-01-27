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
    name: taskName,
    createOrder,
    recoverFromError,
    isOpened,
    isFirstResourceValid,
    isThenResourceValid,
    isScoreValid,
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
          task={taskName}
          close={close}
          footer={
            response !== "" ? null : (
              <TaskSimpleFooter
                nextIf={
                  isFirstResourceValid && isThenResourceValid && isScoreValid
                }
                run={createOrder}
                runLabel="Create order constraint"
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
              tryAgain={createOrder}
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
