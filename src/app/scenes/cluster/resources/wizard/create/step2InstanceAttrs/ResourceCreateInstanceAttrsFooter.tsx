import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useValidation } from "../useValidation";

import { useTryNext } from "../useTryNext";
import { useWizardState } from "../useWizardState";

export const ResourceCreateInstanceAttrsFooter: React.FC = () => {
  // eslint-disable-next-line no-shadow
  const { areInstanceAttrsValid, isAgentLoaded } = useValidation();
  const tryNext = useTryNext();
  const { close } = useWizardState();
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
