import React from "react";
import {
  Button,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view";

export const ResourceCreateFooter: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const [{ agentName, resourceName }, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
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
                    payload: { agentName, resourceName, clusterUrlName },
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
