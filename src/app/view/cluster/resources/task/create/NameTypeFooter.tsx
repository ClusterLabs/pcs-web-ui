import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";

export const NameTypeFooter: React.FC = () => {
  const {
    close,
    isNameTypeValid,
    tryNext,
    wizard: { onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext onClick={() => tryNext(isNameTypeValid)} />
      <TaskButtonBack onClick={onBack} disabled />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
