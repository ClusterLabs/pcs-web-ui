import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";

export const SettingsFooter: React.FC = () => {
  const {
    close,
    areSettingsValid,
    tryNext,
    wizard: { onBack },
  } = useTask();
  return (
    <>
      <TaskButtonNext onClick={() => tryNext(areSettingsValid)} />
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
