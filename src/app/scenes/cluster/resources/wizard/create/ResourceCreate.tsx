import React from "react";
import { useDispatch } from "react-redux";
import { Wizard } from "@patternfly/react-core";

import { Action, selectors } from "app/store";
import { useClusterSelector } from "app/view";

import { ResourceCreateStep1 } from "./ResourceCreateStep1";

export const ResourceCreate = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [{ agentName, resourceName }, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  return (
    <Wizard
      data-test="wizard-add-resource"
      isOpen
      onClose={onClose}
      onSave={() => {
        dispatch<Action>({
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
          component: <ResourceCreateStep1 />,
          nextButtonText: "Create resource",
        },
      ]}
    />
  );
};
