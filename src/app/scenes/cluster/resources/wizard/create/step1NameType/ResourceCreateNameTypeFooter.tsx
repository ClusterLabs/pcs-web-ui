import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import {
  WizardButtonBack,
  WizardButtonCancel,
  WizardButtonNext,
} from "app/view";

import { useValidation } from "../useValidation";
import { useTryNext } from "../useTryNext";

export const ResourceCreateNameTypeFooter: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const tryNext = useTryNext();
  const { isNameTypeValid } = useValidation();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <WizardButtonNext onClick={() => tryNext(isNameTypeValid, onNext)} />
          <WizardButtonBack onClick={onBack} disabled />
          <WizardButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
