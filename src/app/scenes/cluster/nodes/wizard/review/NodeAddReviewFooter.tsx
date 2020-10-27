import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddReviewFooter: React.FC = () => {
  const {
    close,
    nodeAdd,
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext
        onClick={() => {
          nodeAdd();
          onNext();
        }}
        label="Finish"
      />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
