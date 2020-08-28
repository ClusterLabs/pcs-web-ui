import React from "react";

import { useWizardState } from "../useWizardState";
import { ResourceCreateFinishProgress } from "./ResourceCreateFinishProgress";
import { ResourceCreateFinishSuccess } from "./ResourceCreateFinishSuccess";
import { ResourceCreateFinishFail } from "./ResourceCreateFinishFail";

export const ResourceCreateFinish: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const {
    wizardState: { response },
  } = useWizardState();
  switch (response) {
    case "success":
      return <ResourceCreateFinishSuccess onClose={onClose} />;
    case "fail":
      return <ResourceCreateFinishFail onClose={onClose} />;
    default:
      return <ResourceCreateFinishProgress />;
  }
};
