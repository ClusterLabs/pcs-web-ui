import React from "react";

import { useWizard } from "../useWizard";

import { NodeAddFinishProgress } from "./NodeAddFinishProgress";
import { NodeAddFinishSuccess } from "./NodeAddFinishSuccess";

export const NodeAddFinish: React.FC = () => {
  const {
    state: { response },
  } = useWizard();
  switch (response) {
    case "success":
      return <NodeAddFinishSuccess />;
    default:
      return <NodeAddFinishProgress />;
  }
};
