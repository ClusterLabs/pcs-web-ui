import React from "react";
import {
  Button,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

import { types, useDispatch } from "app/store";

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
          if (activeStep.name !== "Review") {
            return (
              <>
                <Button variant="primary" type="submit" onClick={onNext}>
                  Next
                </Button>
                <Button
                  variant="secondary"
                  onClick={onBack}
                  className={
                    activeStep.name === "Name and type" ? "pf-m-disabled" : ""
                  }
                >
                  Back
                </Button>
                <Button variant="link" onClick={onClose}>
                  Cancel
                </Button>
              </>
            );
          }
          return (
            <>
              <Button
                variant="primary"
                type="submit"
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
              >
                Finish
              </Button>
              <Button
                variant="secondary"
                onClick={onBack}
                className={
                  activeStep.name === "Name and type" ? "pf-m-disabled" : ""
                }
              >
                Back
              </Button>
              <Button variant="link" onClick={onClose}>
                Cancel
              </Button>
            </>
          );
        }}
      </WizardContextConsumer>
    </WizardFooter>
  );
};
