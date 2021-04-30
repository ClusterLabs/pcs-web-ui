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
    create,
    wizard: { onNext, onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext
        onClick={() => {
          create({ force: false });
          onNext();
        }}
        label="Create resource"
      />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
