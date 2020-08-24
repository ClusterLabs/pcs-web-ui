import React from "react";
import { Wizard } from "@patternfly/react-core";

import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view";

import { ResourceCreateNameType } from "./ResourceCreateNameType";
import { ResourceCreateReview } from "./ResourceCreateReview";
import { ResourceCreateProgress } from "./ResourceCreateProgress";
import { ResourceCreateFooter } from "./ResourceCreateFooter";

export const ResourceCreate = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [
    { agentName, resourceName, response },
    clusterUrlName,
  ] = useClusterSelector(selectors.getWizardResourceCreateState);
  return (
    <Wizard
      data-test="wizard-add-resource"
      isOpen
      onClose={onClose}
      onSave={() => {
        dispatch({
          type: "RESOURCE.PRIMITIVE.CREATE",
          payload: { agentName, resourceName, clusterUrlName },
        });
        onClose();
      }}
      title="New resource"
      description="Create new resource wizard"
      steps={[
        {
          name: "Name and type",
          component: <ResourceCreateNameType />,
          nextButtonText: "Create resource",
        },
        {
          name: "Review",
          component: <ResourceCreateReview />,
          nextButtonText: "Finish",
        },
        {
          name: "Result",
          component: <ResourceCreateProgress onClose={onClose} />,
          isFinishedStep: response !== "fail" && response !== "forceable-fail",
        },
      ]}
      footer={<ResourceCreateFooter onClose={onClose} />}
    />
  );
};
