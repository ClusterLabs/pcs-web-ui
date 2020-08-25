import React from "react";
import { Wizard } from "@patternfly/react-core";

import { selectors } from "app/store";
import { useClusterSelector } from "app/view";

import { ResourceCreateNameType } from "./ResourceCreateNameType";
import { ResourceCreateInstanceAttrsForm } from "./ResourceCreateInstanceAttrsForm";
import { ResourceCreateReview } from "./ResourceCreateReview";
import { ResourceCreateProgress } from "./ResourceCreateProgress";
import { ResourceCreateFooter } from "./ResourceCreateFooter";

export const ResourceCreate = ({ onClose }: { onClose: () => void }) => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const { response } = wizardState;
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
        },
        {
          name: "Review",
          component: <ResourceCreateReview wizardState={wizardState} />,
        },
        {
          name: "Result",
          component: (
            <ResourceCreateProgress
              onClose={onClose}
              wizardState={wizardState}
            />
          ),
          isFinishedStep: response !== "fail" && response !== "forceable-fail",
        },
      ]}
      footer={
        <ResourceCreateFooter
          onClose={onClose}
          wizardState={wizardState}
          clusterUrlName={clusterUrlName}
        />
      }
    />
  );
};
