import React from "react";

import { WizardProgress } from "app/view/share";

import { useWizard } from "../useWizard";

import { NodeAddFinishSuccess } from "./NodeAddFinishSuccess";
import { NodeAddFinishFail } from "./NodeAddFinishFail";
import { NodeAddFinishError } from "./NodeAddFinishError";

export const NodeAddFinish: React.FC = () => {
  const {
    state: { response, nodeName },
  } = useWizard();
  switch (response) {
    case "success":
      return <NodeAddFinishSuccess />;
    case "fail":
      return <NodeAddFinishFail />;
    case "communication-error":
      return <NodeAddFinishError />;
    default:
      return (
        <WizardProgress
          title={`Add node "${nodeName}" progress`}
          progressTitle="Adding node"
        />
      );
  }
};
