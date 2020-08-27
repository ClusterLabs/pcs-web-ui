import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { isNameTypeValid } from "../validation";
import { ButtonNext } from "./ButtonNext";
import { ButtonCancel } from "./ButtonCancel";
import { ButtonBack } from "./ButtonBack";
import { useTryNext } from "./useTryNext";
import { useWizardState } from "../useWizardState";

export const ResourceCreateFooterNameType: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const tryNext = useTryNext();
  const { wizardState } = useWizardState();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <ButtonNext
            onClick={() => tryNext(isNameTypeValid(wizardState), onNext)}
          />
          <ButtonBack onClick={onBack} disabled />
          <ButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
