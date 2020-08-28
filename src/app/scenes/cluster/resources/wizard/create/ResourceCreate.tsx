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

export const ResourceCreate = ({ onClose }: { onClose: () => void }) => {
  const { isNameTypeValid, areInstanceAttrsValid } = useValidation();
  return (
    <Wizard
      data-test="wizard-add-resource"
      isOpen
      onClose={onClose}
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
          component: <ResourceCreateFinish onClose={onClose} />,
          isFinishedStep: true,
        },
      ]}
      footer={
        <WizardFooter>
          <WizardContextConsumer>
            {({ activeStep }) => (
              <>
                {activeStep.name === "Name and type" && (
                  <ResourceCreateNameTypeFooter onClose={onClose} />
                )}
                {activeStep.name === "Instance attributes" && (
                  <ResourceCreateInstanceAttrsFooter onClose={onClose} />
                )}
                {activeStep.name === "Review" && (
                  <ResourceCreateReviewFooter onClose={onClose} />
                )}
              </>
            )}
          </WizardContextConsumer>
        </WizardFooter>
      }
    />
  );
};
