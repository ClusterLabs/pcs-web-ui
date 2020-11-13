import React from "react";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateReviewFooter: React.FC = () => {
  const {
    state: { agentName, resourceName, instanceAttrs, disabled },
    clusterUrlName,
    dispatch,
    close,
    wizard: { onNext, onBack },
  } = useWizard();
  return (
    <>
      <WizardButtonNext
        onClick={() => {
          dispatch({
            type: "RESOURCE.CREATE",
            payload: {
              agentName,
              resourceName,
              clusterUrlName,
              instanceAttrs,
              disabled,
            },
          });
          onNext();
        }}
        label="Finish"
      />
      <WizardButtonBack onClick={onBack} />
      <WizardButtonCancel onClick={close} />
    </>
  );
};
