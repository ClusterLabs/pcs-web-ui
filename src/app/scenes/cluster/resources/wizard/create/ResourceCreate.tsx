import React from "react";
import { useDispatch } from "react-redux";
import { Wizard } from "@patternfly/react-core";

import { Action } from "app/store";
import { useSelectedClusterName } from "app/view";

import { ResourceCreateStep1 } from "./ResourceCreateStep1";
import { useResourceCreateContext } from "./ResourceCreateContext";

export const ResourceCreate = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const {
    state: { agentName, resourceName },
  } = useResourceCreateContext();
  const clusterUrlName = useSelectedClusterName();
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
