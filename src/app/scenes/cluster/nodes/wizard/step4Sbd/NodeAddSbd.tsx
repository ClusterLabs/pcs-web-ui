import React from "react";
import { Alert } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

export const NodeAddSbd: React.FC = () => {
  return (
    <WizardLibStep title="Configure sbd">
      <Alert variant="info" isInline title="Cluster has no sbd." />
    </WizardLibStep>
  );
};
