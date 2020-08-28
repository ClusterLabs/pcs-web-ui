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

export const ResourceCreateNameTypeFooter: React.FC = () => {
  const tryNext = useTryNext();
  const { isNameTypeValid } = useValidation();
  const { close } = useWizardState();
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
