import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateInstanceAttrsFooter: React.FC = () => {
  // eslint-disable-next-line no-shadow
  const { close, areInstanceAttrsValid, isAgentLoaded, tryNext } = useWizard();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext
            onClick={() => tryNext(areInstanceAttrsValid, onNext)}
            disabled={!isAgentLoaded}
          />
          <WizardButtonBack onClick={onBack} disabled />
          <WizardButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
