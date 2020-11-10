import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddNodeNameFooter: React.FC = () => {
  const {
    close,
    isNameValid,
    tryNext,
    wizard: { onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={() => tryNext(isNameValid)} />
      <WizardButtonBack onClick={onBack} disabled />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
