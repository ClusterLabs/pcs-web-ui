import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizardState } from "../useWizardState";

export const ResourceCreateReviewFooter: React.FC = () => {
  const {
    wizardState: { agentName, resourceName, instanceAttrs },
    clusterUrlName,
    dispatch,
    close,
  } = useWizardState();
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
