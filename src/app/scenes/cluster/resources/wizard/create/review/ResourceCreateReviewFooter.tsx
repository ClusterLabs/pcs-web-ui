import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateReviewFooter: React.FC = () => {
  const {
    wizardState: { agentName, resourceName, instanceAttrs, disabled },
    clusterUrlName,
    dispatch,
    close,
  } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext
            onClick={() => {
              dispatch({
                type: "RESOURCE.PRIMITIVE.CREATE",
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
      )}
    </WizardContextConsumer>
  );
};
