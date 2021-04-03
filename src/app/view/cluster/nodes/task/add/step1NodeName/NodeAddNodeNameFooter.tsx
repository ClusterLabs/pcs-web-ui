import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "../useTask";

export const NodeAddNodeNameFooter: React.FC = () => {
  const {
    close,
    isNameValid,
    tryNext,
    wizard: { onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext onClick={() => tryNext(isNameValid)} />
      <TaskButtonBack onClick={onBack} disabled />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
