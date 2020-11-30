import React from "react";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceGroupResourceSelect: React.FC = () => {
  const {
    state: { reports },
  } = useWizard();
  return (
    <WizardLibStep title="Select resources to group" reports={reports}>
      SELECT GROUPS
    </WizardLibStep>
  );
};
