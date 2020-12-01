import React from "react";

import { Wizard } from "app/view";

import { useWizard } from "./useWizard";
import {
  ResourceAddToGroupGroupName,
  ResourceAddToGroupGroupNameFooter,
} from "./step1GroupName";

export const ResourceAddToGroup: React.FC = () => {
  const { close } = useWizard();
  return (
    <Wizard
      data-test="wizard-resource-add-to-group"
      onClose={close}
      title="New group"
      description="Create new group wizard"
      steps={[
        {
          name: "Specify group",
          component: <ResourceAddToGroupGroupName />,
          footer: <ResourceAddToGroupGroupNameFooter />,
        },
      ]}
    />
  );
};
