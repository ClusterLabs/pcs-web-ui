import React from "react";

import { useWizard } from "../useWizard";
import { ResourceCreateFinishProgress } from "./ResourceCreateFinishProgress";
import { ResourceCreateFinishSuccess } from "./ResourceCreateFinishSuccess";
import { ResourceCreateFinishFail } from "./ResourceCreateFinishFail";
import { ResourceCreateFinishError } from "./ResourceCreateFinishError";

export const ResourceCreateFinish: React.FC = () => {
  const {
    wizardState: { response },
  } = useWizard();
  switch (response) {
    case "success":
      return <ResourceCreateFinishSuccess />;
    case "fail":
      return <ResourceCreateFinishFail />;
    case "communication-error":
      return <ResourceCreateFinishError />;
    default:
      return <ResourceCreateFinishProgress />;
  }
};
