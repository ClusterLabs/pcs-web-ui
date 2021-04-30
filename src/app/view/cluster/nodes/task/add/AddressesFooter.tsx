import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";

export const AddressesFooter: React.FC = () => {
  const {
    close,
    wizard: { onNext, onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext onClick={onNext} />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
