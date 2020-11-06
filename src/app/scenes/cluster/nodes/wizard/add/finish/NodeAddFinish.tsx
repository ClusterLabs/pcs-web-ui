import React from "react";

import { WizardProgress } from "app/view";

import { useWizard } from "../useWizard";

import { NodeAddFinishSuccess } from "./NodeAddFinishSuccess";

export const NodeAddFinish: React.FC = () => {
  const {
    state: { response, nodeName },
  } = useWizard();
  switch (response) {
    case "success":
      return <NodeAddFinishSuccess />;
    default:
      return (
        <WizardProgress
          title={`Add node "${nodeName}" progress`}
          progressTitle="Adding node"
        />
      );
  }
};
