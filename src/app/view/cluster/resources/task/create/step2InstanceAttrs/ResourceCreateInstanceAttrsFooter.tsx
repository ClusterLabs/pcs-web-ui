import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "../useTask";

export const ResourceCreateInstanceAttrsFooter: React.FC = () => {
  const {
    close,
    areInstanceAttrsValid,
    isAgentLoaded,
    tryNext,
    wizard: { onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext
        onClick={() => tryNext(areInstanceAttrsValid)}
        disabled={!isAgentLoaded}
      />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
