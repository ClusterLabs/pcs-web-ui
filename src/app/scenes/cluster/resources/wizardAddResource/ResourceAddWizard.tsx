import React from "react";
import { Wizard } from "@patternfly/react-core";

export const ResourceAddWizard = ({ onClose }: { onClose: () => void }) => {
  const steps = [
    { name: "Name and type", component: <p>Choose resource name and type</p> },
  ];
  return (
    <Wizard
      data-test="wizard-add-resource"
      isOpen
      onNext={onClose}
      onClose={onClose}
      title="Add new resource"
      description="Add existing cluster wizard"
      steps={steps}
    />
  );
};
