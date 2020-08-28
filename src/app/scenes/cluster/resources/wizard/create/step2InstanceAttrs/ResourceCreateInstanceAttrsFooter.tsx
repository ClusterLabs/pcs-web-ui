import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useValidation } from "../useValidation";

import { useTryNext } from "../useTryNext";

export const ResourceCreateInstanceAttrsFooter: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  // eslint-disable-next-line no-shadow
  const { areInstanceAttrsValid, isAgentLoaded } = useValidation();
  const tryNext = useTryNext();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext
            onClick={() => tryNext(areInstanceAttrsValid, onNext)}
            disabled={!isAgentLoaded}
          />
          <WizardButtonBack onClick={onBack} disabled />
          <WizardButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
