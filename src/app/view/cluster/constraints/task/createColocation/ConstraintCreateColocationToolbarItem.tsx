import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const ConstraintCreateColocationToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    createColocation,
    recoverFromError,
    isOpened,
    isResourceValid,
    isWithResourceValid,
    state: {
      call: { response, resultMessage },
    },
  } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-colocation-create"
      >
        Create Colocation
      </Button>
      {isOpened && (
        <TaskSimple
          title="Create colocation constraint"
          close={close}
          footer={
            response !== "" ? null : (
              <TaskSimpleFooter
                task="constraintColocationCreate"
                nextIf={isResourceValid && isWithResourceValid}
                run={createColocation}
                runLabel="Create colocation constraint"
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
              waitTitle="Creating colocation constraint"
              successTitle="Colocation created successfully"
              failTitle="Create colocation constraint failed"
              close={close}
              tryAgain={createColocation}
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
