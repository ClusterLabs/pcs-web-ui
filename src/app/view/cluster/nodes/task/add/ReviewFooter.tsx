import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";

export const ReviewFooter: React.FC = () => {
  const {
    close,
    nodeAdd,
    wizard: { onNext, onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext
        onClick={() => {
          nodeAdd();
          onNext();
        }}
        label="Finish"
      />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
