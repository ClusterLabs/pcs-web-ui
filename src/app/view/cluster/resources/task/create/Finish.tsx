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
      resourceName,
      libCall: { reports, response },
    },
    wizard: { goToStepByName },
  } = useTask();
  switch (response) {
    case "success":
      return (
        <TaskSuccessLib
          title={`Resource "${resourceName}" created successfully`}
          close={close}
          reports={reports}
        />
      );
    case "fail":
      return (
        <TaskFinishFailLib
          title={`Create resource "${resourceName}" failed`}
          toFirstStep={() => goToStepByName("Name and type")}
          close={close}
          createForce={() => create({ force: true })}
          createForceLabel={
            <>Create resource anyway (proceed with current settings)</>
          }
          reports={reports}
        />
      );
    case "communication-error":
      return (
        <TaskFinishErrorLib
          title={
            <>
              Communication error while creating the resource
              {` "${resourceName}"`}
            </>
          }
          tryAgain={() => goToStepByName("Review")}
          close={close}
        />
      );
    default:
      return (
        <TaskProgress
          title={`Create new resource "${resourceName}" progress`}
          progressTitle="Creating resource"
        />
      );
  }
};
