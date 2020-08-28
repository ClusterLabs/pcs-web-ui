import React from "react";

import { useWizardState } from "../useWizardState";
import { ResourceCreateFinishProgress } from "./ResourceCreateFinishProgress";
import { ResourceCreateFinishSuccess } from "./ResourceCreateFinishSuccess";
import { ResourceCreateFinishFail } from "./ResourceCreateFinishFail";

export const ResourceCreateFinish: React.FC = () => {
  const {
    wizardState: { response },
  } = useWizardState();
  switch (response) {
    case "success":
      return <ResourceCreateFinishSuccess />;
    case "fail":
      return <ResourceCreateFinishFail />;
    default:
      return <ResourceCreateFinishProgress />;
  }
};
