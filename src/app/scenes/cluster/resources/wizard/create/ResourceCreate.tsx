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
import {
  ResourceCreateSettings,
  ResourceCreateSettingsFooter,
} from "./step3Settings";
import { ResourceCreateReview, ResourceCreateReviewFooter } from "./review";
import { ResourceCreateFinish } from "./finish";
import { useWizard } from "./useWizard";

export const ResourceCreate: React.FC = () => {
  const {
    close,
    isNameTypeValid,
    areInstanceAttrsValid,
    areSettingsValid,
  } = useWizard();
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
          name: "Settings",
          component: <ResourceCreateSettings />,
          canJumpTo: isNameTypeValid && areInstanceAttrsValid,
        },
        {
          name: "Review",
          component: <ResourceCreateReview />,
          canJumpTo:
            isNameTypeValid && areInstanceAttrsValid && areSettingsValid,
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
                {activeStep.name === "Settings" && (
                  <ResourceCreateSettingsFooter />
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
