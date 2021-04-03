import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";

export const ConstraintCreateOrderSetOptionsFooter: React.FC = () => {
  const {
    close,
    wizard: { onBack, onNext },
  } = useTask();
  return (
    <>
      <TaskButtonNext onClick={onNext} />
      <TaskButtonBack onClick={onBack} disabled />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
