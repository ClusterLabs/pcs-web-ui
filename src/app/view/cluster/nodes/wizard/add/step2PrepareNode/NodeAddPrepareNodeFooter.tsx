import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view/share";

import { useWizard } from "../useWizard";

import { NodeAddPrepareNodeFooterAuthButton } from "./NodeAddPrepareNodeFooterAuthButton";

export const NodeAddPrepareNodeFooter: React.FC = () => {
  const {
    state: { authProcessId },
    close,
    isNodeCheckDoneValid,
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      {authProcessId && (
        <NodeAddPrepareNodeFooterAuthButton authProcessId={authProcessId} />
      )}
      {!authProcessId && (
        <WizardButtonNext disabled={!isNodeCheckDoneValid} onClick={onNext} />
      )}
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
