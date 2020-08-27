import React from "react";
import {
  Wizard,
  WizardContextConsumer,
  WizardFooter,
} from "@patternfly/react-core";

import { selectors, useSelector } from "app/store";
import { useClusterSelector } from "app/view";

import { areInstanceAttrsValid, isNameTypeValid } from "./validation";
import { ResourceCreateNameType } from "./ResourceCreateNameType";
import { ResourceCreateInstanceAttrsForm } from "./ResourceCreateInstanceAttrsForm";
import { ResourceCreateReview } from "./ResourceCreateReview";
import { ResourceCreateProgress } from "./ResourceCreateProgress";

import {
  ResourceCreateFooterInstanceAttrs,
  ResourceCreateFooterNameType,
  ResourceCreateFooterReview,
} from "./footer";

export const ResourceCreate = ({ onClose }: { onClose: () => void }) => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const agent = useSelector(
    selectors.getPcmkAgent(clusterUrlName, wizardState.agentName),
  );
  const isWizardValid =
    isNameTypeValid(wizardState) && areInstanceAttrsValid(agent, wizardState);
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
          component: (
            <ResourceCreateNameType
              wizardState={wizardState}
              clusterUrlName={clusterUrlName}
            />
          ),
        },
        {
          name: "Instance attributes",
          component: (
            <ResourceCreateInstanceAttrsForm
              wizardState={wizardState}
              clusterUrlName={clusterUrlName}
            />
          ),
          canJumpTo: isNameTypeValid(wizardState),
        },
        {
          name: "Review",
          component: <ResourceCreateReview wizardState={wizardState} />,
          canJumpTo: isWizardValid,
        },
        {
          name: "Result",
          component: (
            <ResourceCreateProgress
              onClose={onClose}
              wizardState={wizardState}
            />
          ),
          isFinishedStep: true,
        },
      ]}
      footer={
        <WizardFooter>
          <WizardContextConsumer>
            {({ activeStep }) => {
              if (activeStep.name === "Name and type") {
                return <ResourceCreateFooterNameType onClose={onClose} />;
              }
              if (activeStep.name === "Instance attributes") {
                return <ResourceCreateFooterInstanceAttrs onClose={onClose} />;
              }
              // activeStep.name === "Review"
              return <ResourceCreateFooterReview onClose={onClose} />;
            }}
          </WizardContextConsumer>
        </WizardFooter>
      }
    />
  );
};
