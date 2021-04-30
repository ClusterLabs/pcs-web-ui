import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "./useTask";
import { PrepareNodeFooterAuthButton } from "./PrepareNodeFooterAuthButton";

export const PrepareNodeFooter: React.FC = () => {
  const {
    state: { authProcessId },
    close,
    isNodeCheckDoneValid,
    wizard: { onNext, onBack },
  } = useTask();
  return (
    <>
      {authProcessId && (
        <PrepareNodeFooterAuthButton authProcessId={authProcessId} />
      )}
      {!authProcessId && (
        <TaskButtonNext disabled={!isNodeCheckDoneValid} onClick={onNext} />
      )}
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
