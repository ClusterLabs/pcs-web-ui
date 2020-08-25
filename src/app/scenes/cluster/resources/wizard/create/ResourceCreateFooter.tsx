import React from "react";
import {
  Button,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

import { types, useDispatch } from "app/store";

const ButtonNext: React.FC<{ onClick: () => void; label?: string }> = ({
  onClick,
  label = "Next",
}) => {
  return (
    <Button variant="primary" type="submit" onClick={onClick}>
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

export const ResourceCreateFooter: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
  onClose: () => void;
  clusterUrlName: string;
}> = ({
  onClose,
  wizardState: { agentName, resourceName, instanceAttrs },
  clusterUrlName,
}) => {
  const dispatch = useDispatch();
  return (
    <WizardFooter>
      <WizardContextConsumer>
        {({ activeStep, onNext, onBack }) => {
          if (activeStep.name === "Name and type") {
            return (
              <>
                <ButtonNext
                  onClick={() => {
                    if (resourceName.length > 0 && agentName.length > 0) {
                      dispatch({
                        type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE",
                        payload: { clusterUrlName },
                      });
                      onNext();
                    } else {
                      dispatch({
                        type: "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW",
                        payload: { clusterUrlName },
                      });
                    }
                  }}
                />
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
