import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";

export const ResourceSetListFooter: React.FC = () => {
  const {
    close,
    wizard: { onBack, onNext },
  } = useTask();
  return (
    <>
      <TaskButtonNext onClick={onNext} />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
