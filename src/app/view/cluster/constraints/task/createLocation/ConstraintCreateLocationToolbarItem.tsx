import React from "react";
import { Button } from "@patternfly/react-core";

import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const ConstraintCreateLocationToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    createLocation,
    recoverFromError,
    isOpened,
    isScoreValid,
    isResourceValid,
    isPatternValid,
    isNodeValid,
    isRuleValid,
    state: {
      call: { response, resultMessage },
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
          footer={
            response !== "" ? null : (
              <TaskSimpleFooter
                task="constraintLocationCreate"
                nextIf={
                  isScoreValid
                  && isResourceValid
                  && isPatternValid
                  && isNodeValid
                  && isRuleValid
                }
                run={createLocation}
                runLabel="Create location constraint"
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
              waitTitle="Creating location constraint"
              successTitle="Location created successfully"
              failTitle="Create location constraint failed"
              close={close}
              tryAgain={createLocation}
              recoverFromError={recoverFromError}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
