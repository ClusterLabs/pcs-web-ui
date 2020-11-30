import React from "react";

import { Wizard } from "app/view";

import { useWizard } from "./useWizard";
import {
  ResourceGroupResourceSelect,
  ResourceGroupResourceSelectFooter,
} from "./step1Resources";

export const ResourceGroup: React.FC = () => {
  const { close } = useWizard();
  return (
    <Wizard
      data-test="wizard-resource-group"
      onClose={close}
      title="New group"
      description="Create new group wizard"
      steps={[
        {
          name: "Select resources",
          component: <ResourceGroupResourceSelect />,
          footer: <ResourceGroupResourceSelectFooter />,
        },
      ]}
    />
  );
};
