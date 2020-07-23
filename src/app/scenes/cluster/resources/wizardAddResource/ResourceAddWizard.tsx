import React from "react";
import { useDispatch } from "react-redux";
import { Wizard } from "@patternfly/react-core";

import { Action } from "app/store";
import { useSelectedClusterName } from "app/view";

import { ResourceAddWizardS1 } from "./ResourceAddWizardS1";
import { usePrimitiveCreateWizardContext } from "./PrimitiveCreateWizardContext";

export const ResourceAddWizard = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const {
    state: { agentName, resourceName },
  } = usePrimitiveCreateWizardContext();
  const clusterUrlName = useSelectedClusterName();
  return (
    <Wizard
      data-test="wizard-add-resource"
      isOpen
      onClose={() => {
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
          component: <ResourceAddWizardS1 />,
          nextButtonText: "Create resource",
        },
      ]}
    />
  );
};
