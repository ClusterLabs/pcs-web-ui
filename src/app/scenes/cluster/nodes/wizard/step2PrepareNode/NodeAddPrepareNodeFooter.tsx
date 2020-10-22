import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddPrepareNodeFooter: React.FC = () => {
  const {
    close,
    wizardState: { nodeCheck },
  } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext
            onClick={onNext}
            disabled={nodeCheck !== "success"}
          />
          <WizardButtonBack onClick={onBack} />
          <WizardButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
