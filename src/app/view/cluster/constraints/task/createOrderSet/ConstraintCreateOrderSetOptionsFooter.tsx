import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view/share";

import { useWizard } from "./useWizard";

export const ConstraintCreateOrderSetOptionsFooter: React.FC = () => {
  const {
    close,
    wizard: { onBack, onNext },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={onNext} />
      <WizardButtonBack onClick={onBack} disabled />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
