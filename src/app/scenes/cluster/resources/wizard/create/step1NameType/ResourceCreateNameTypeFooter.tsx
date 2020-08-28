import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateNameTypeFooter: React.FC = () => {
  const { close, isNameTypeValid, tryNext } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext onClick={() => tryNext(isNameTypeValid, onNext)} />
          <WizardButtonBack onClick={onBack} disabled />
          <WizardButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
