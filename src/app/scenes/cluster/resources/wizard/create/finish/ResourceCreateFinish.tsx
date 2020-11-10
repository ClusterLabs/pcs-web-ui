import React from "react";

import { WizardProgress } from "app/view";

import { useWizard } from "../useWizard";

import { ResourceCreateFinishSuccess } from "./ResourceCreateFinishSuccess";
import { ResourceCreateFinishFail } from "./ResourceCreateFinishFail";
import { ResourceCreateFinishError } from "./ResourceCreateFinishError";

export const ResourceCreateFinish: React.FC = () => {
  const {
    state: { response, resourceName },
  } = useWizard();
  switch (response) {
    case "success":
      return <ResourceCreateFinishSuccess />;
    case "fail":
      return <ResourceCreateFinishFail />;
    case "communication-error":
      return <ResourceCreateFinishError />;
    default:
      return (
        <WizardProgress
          title={`Create new resource "${resourceName}" progress`}
          progressTitle="Creating resource"
        />
      );
  }
};
