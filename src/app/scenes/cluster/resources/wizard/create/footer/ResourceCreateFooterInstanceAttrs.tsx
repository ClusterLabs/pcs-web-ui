import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { types } from "app/store";
import { LoadedPcmkAgent } from "app/view";

import { areInstanceAttrsValid } from "../validation";
import { ButtonNext } from "./ButtonNext";
import { ButtonCancel } from "./ButtonCancel";
import { ButtonBack } from "./ButtonBack";
import { useTryNext } from "./useTryNext";
import { useWizardState } from "../useWizardState";

export const ResourceCreateFooterInstanceAttrs: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { wizardState, clusterUrlName } = useWizardState();
  const tryNext = useTryNext();
  return (
    <WizardContextConsumer>
      {({ onNext, onBack }) => (
        <>
          <LoadedPcmkAgent
            clusterUrlName={clusterUrlName}
            agentName={wizardState.agentName}
            fallback={<ButtonNext disabled />}
          >
            {(agent: types.pcmkAgents.Agent) => (
              <ButtonNext
                onClick={() =>
                  tryNext(areInstanceAttrsValid(agent, wizardState), onNext)
                }
              />
            )}
          </LoadedPcmkAgent>
          <ButtonBack onClick={onBack} disabled />
          <ButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
