import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { WizardButtonBack, WizardButtonNext } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddSbdFooter: React.FC = () => {
  const { close } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext onClick={onNext} />
          <WizardButtonBack onClick={onBack} disabled />
          <WizardButtonBack onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
