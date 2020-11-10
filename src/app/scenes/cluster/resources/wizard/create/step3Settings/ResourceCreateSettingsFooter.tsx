import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateSettingsFooter: React.FC = () => {
  const {
    close,
    areSettingsValid,
    tryNext,
    wizard: { onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext onClick={() => tryNext(areSettingsValid)} />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
