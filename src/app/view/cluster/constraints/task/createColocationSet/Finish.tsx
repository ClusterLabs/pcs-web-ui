import React from "react";

import {
  TaskFinishErrorLib,
  TaskFinishFailLib,
  TaskProgress,
  TaskSuccessLib,
} from "app/view/share";

import { useTask } from "./useTask";

export const Finish: React.FC = () => {
  const {
    close,
    create,
    state: {
      libCall: { response, reports },
    },
    wizard: { goToStepByName },
  } = useTask();
  switch (response) {
    case "success":
      return (
        <TaskSuccessLib
          title={"Constraint has been created successfully"}
          close={close}
          reports={reports}
        />
      );
    case "fail":
      return (
        <TaskFinishFailLib
          title={"Create constraint colocation with resource sets failed"}
          toFirstStep={() => goToStepByName("Resource Sets")}
          close={close}
          createForce={() => create({ force: true })}
          createForceLabel={
            <>
              Create colocation constraint anyway (proceed with current
              settings)
            </>
          }
          reports={reports}
        />
      );
    case "communication-error":
      return (
        <TaskFinishErrorLib
          title="Communication error while creating the colocation constraint"
          tryAgain={() => goToStepByName("Review")}
          close={close}
        />
      );
    default:
      return (
        <TaskProgress
          title={"Create new constraint colocation with resource sets"}
          progressTitle="Creating constraint colocation with resource sets"
        />
      );
  }
};
