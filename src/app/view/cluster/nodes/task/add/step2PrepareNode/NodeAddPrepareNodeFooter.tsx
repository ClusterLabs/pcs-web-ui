import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonNext,
} from "app/view/share";

import { useTask } from "../useTask";

import { NodeAddPrepareNodeFooterAuthButton } from "./NodeAddPrepareNodeFooterAuthButton";

export const NodeAddPrepareNodeFooter: React.FC = () => {
  const {
    state: { authProcessId },
    close,
    isNodeCheckDoneValid,
    wizard: { onNext, onBack },
  } = useTask();
  return (
    <>
      {authProcessId && (
        <NodeAddPrepareNodeFooterAuthButton authProcessId={authProcessId} />
      )}
      {!authProcessId && (
        <TaskButtonNext disabled={!isNodeCheckDoneValid} onClick={onNext} />
      )}
      <TaskButtonBack onClick={onBack} />
      <TaskButtonCancel onClick={close} />
    </>
  );
};
