import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddSbdFooter: React.FC = () => {
  const {
    close,
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={onNext} />
      <WizardButtonBack onClick={onBack} disabled />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
