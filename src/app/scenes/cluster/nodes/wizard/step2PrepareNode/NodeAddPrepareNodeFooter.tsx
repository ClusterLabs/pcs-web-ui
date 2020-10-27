import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddPrepareNodeFooter: React.FC = () => {
  const {
    close,
    wizardState: { nodeCheck },
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={onNext} disabled={nodeCheck !== "success"} />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
