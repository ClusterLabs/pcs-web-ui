import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { ButtonNext } from "./ButtonNext";
import { ButtonCancel } from "./ButtonCancel";
import { ButtonBack } from "./ButtonBack";
import { useWizardState } from "../useWizardState";

export const ResourceCreateFooterReview: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const {
    wizardState: { agentName, resourceName, instanceAttrs },
    clusterUrlName,
    dispatch,
  } = useWizardState();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <ButtonNext
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
          <ButtonBack onClick={onBack} />
          <ButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
