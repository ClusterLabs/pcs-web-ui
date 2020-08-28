import React from "react";

import { useWizard } from "../useWizard";
import { ResourceCreateFinishProgress } from "./ResourceCreateFinishProgress";
import { ResourceCreateFinishSuccess } from "./ResourceCreateFinishSuccess";
import { ResourceCreateFinishFail } from "./ResourceCreateFinishFail";

export const ResourceCreateFinish: React.FC = () => {
  const {
    wizardState: { response },
  } = useWizard();
  switch (response) {
    case "success":
      return <ResourceCreateFinishSuccess />;
    case "fail":
      return <ResourceCreateFinishFail />;
    default:
      return <ResourceCreateFinishProgress />;
  }
};
