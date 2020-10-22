import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddNodeNameFooter: React.FC = () => {
  const { close } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext onClick={onNext} />
          <WizardButtonBack onClick={onBack} disabled />
          <WizardButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
