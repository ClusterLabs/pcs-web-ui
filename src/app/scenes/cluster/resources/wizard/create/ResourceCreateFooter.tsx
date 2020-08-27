import React from "react";
import {
  Button,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

import { types, useDispatch } from "app/store";
import { LoadedPcmkAgent } from "app/view";

import { areInstanceAttrsValid, isNameTypeValid } from "./validation";

const ButtonNext: React.FC<{
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}> = ({ onClick = undefined, label = "Next", disabled = false }) => {
  return (
    <Button
      variant="primary"
      type="submit"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
    >
      {label}
    </Button>
  );
};

const ButtonCancel: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button variant="link" onClick={onClick}>
      Cancel
    </Button>
  );
};

const ButtonBack: React.FC<{ onClick: () => void; disabled?: boolean }> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
    >
      Back
    </Button>
  );
};

const tryNext = (
  dispatch: ReturnType<typeof useDispatch>,
  next: () => void,
  clusterUrlName: string,
  isValid: boolean,
) => {
  if (isValid) {
    dispatch({
      type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE",
      payload: { clusterUrlName },
    });
    next();
  } else {
    dispatch({
      type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW",
      payload: { clusterUrlName },
    });
  }
};

export const ResourceCreateFooter: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
  onClose: () => void;
  clusterUrlName: string;
}> = ({ onClose, wizardState, clusterUrlName }) => {
  const { agentName, resourceName, instanceAttrs } = wizardState;
  const dispatch = useDispatch();
  return (
    <WizardFooter>
      <WizardContextConsumer>
        {({ activeStep, onNext, onBack }) => {
          if (activeStep.name === "Name and type") {
            return (
              <>
                <ButtonNext
                  onClick={() =>
                    tryNext(
                      dispatch,
                      onNext,
                      clusterUrlName,
                      isNameTypeValid(wizardState),
                    )
                  }
                />
                <ButtonBack onClick={onBack} disabled />
                <ButtonCancel onClick={onClose} />
              </>
            );
          }
          if (activeStep.name === "Instance attributes") {
            return (
              <>
                <LoadedPcmkAgent
                  clusterUrlName={clusterUrlName}
                  agentName={agentName}
                  fallback={<ButtonNext disabled />}
                >
                  {(agent: types.pcmkAgents.Agent) => (
                    <ButtonNext
                      onClick={() =>
                        tryNext(
                          dispatch,
                          onNext,
                          clusterUrlName,
                          areInstanceAttrsValid(agent, wizardState),
                        )
                      }
                    />
                  )}
                </LoadedPcmkAgent>
                <ButtonBack onClick={onBack} disabled />
                <ButtonCancel onClick={onClose} />
              </>
            );
          }

          if (activeStep.name === "Review") {
            return (
              <>
                <ButtonNext
                  onClick={() => {
                    dispatch({
                      type: "RESOURCE.PRIMITIVE.CREATE",
                      payload: {
                        agentName,
                        resourceName,
                        clusterUrlName,
                        instanceAttrs,
                      },
                    });
                    onNext();
                  }}
                  label="Finish"
                />
                <ButtonBack onClick={onBack} />
                <ButtonCancel onClick={onClose} />
              </>
            );
          }

          return (
            <>
              <ButtonNext onClick={onNext} />
              <ButtonBack onClick={onBack} />
              <ButtonCancel onClick={onClose} />
            </>
          );
        }}
      </WizardContextConsumer>
    </WizardFooter>
  );
};
