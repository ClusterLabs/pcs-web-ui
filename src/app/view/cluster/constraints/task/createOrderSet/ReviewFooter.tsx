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
    wizard: { onNext, onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext
        onClick={() => {
          onNext();
        }}
        label="Create constraint"
      />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
