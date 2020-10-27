import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateNameTypeFooter: React.FC = () => {
  const {
    close,
    isNameTypeValid,
    tryNext,
    wizard: { onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={() => tryNext(isNameTypeValid)} />
      <WizardButtonBack onClick={onBack} disabled />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
