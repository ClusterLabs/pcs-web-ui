import React from "react";
import {
  Wizard,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

import {
  ResourceCreateNameType,
  ResourceCreateNameTypeFooter,
} from "./step1NameType";
import {
  ResourceCreateInstanceAttrsFooter,
  ResourceCreateInstanceAttrsForm,
} from "./step2InstanceAttrs";
import { ResourceCreateReview, ResourceCreateReviewFooter } from "./review";
import { ResourceCreateFinish } from "./finish";
import { useValidation } from "./useValidation";
import { useWizardState } from "./useWizardState";

export const ResourceCreate: React.FC = () => {
  const { close } = useWizardState();
  const { isNameTypeValid, areInstanceAttrsValid } = useValidation();
  return (
    <Wizard
      data-test="wizard-add-resource"
      isOpen
      onClose={close}
      title="New resource"
      description="Create new resource wizard"
      steps={[
        {
          name: "Name and type",
          component: <ResourceCreateNameType />,
        },
        {
          name: "Instance attributes",
          component: <ResourceCreateInstanceAttrsForm />,
          canJumpTo: isNameTypeValid,
        },
        {
          name: "Review",
          component: <ResourceCreateReview />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Result",
          component: <ResourceCreateFinish />,
          isFinishedStep: true,
        },
      ]}
      footer={
        <WizardFooter>
          <WizardContextConsumer>
            {({ activeStep }) => (
              <>
                {activeStep.name === "Name and type" && (
                  <ResourceCreateNameTypeFooter />
                )}
                {activeStep.name === "Instance attributes" && (
                  <ResourceCreateInstanceAttrsFooter />
                )}
                {activeStep.name === "Review" && <ResourceCreateReviewFooter />}
              </>
            )}
          </WizardContextConsumer>
        </WizardFooter>
      }
    />
  );
};
