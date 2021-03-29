import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view/share";

import { useWizard } from "../useWizard";

export const ResourceCreateInstanceAttrsFooter: React.FC = () => {
  const {
    close,
    areInstanceAttrsValid,
    isAgentLoaded,
    tryNext,
    wizard: { onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext
        onClick={() => tryNext(areInstanceAttrsValid)}
        disabled={!isAgentLoaded}
      />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
