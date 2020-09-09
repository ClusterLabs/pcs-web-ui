import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateSettingsFooter: React.FC = () => {
  const { close, areSettingsValid, tryNext } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext onClick={() => tryNext(areSettingsValid, onNext)} />
          <WizardButtonBack onClick={onBack} />
          <WizardButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
