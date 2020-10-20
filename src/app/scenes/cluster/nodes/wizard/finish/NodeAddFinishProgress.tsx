import React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";

import { useWizard } from "../useWizard";

export const NodeAddFinishProgress: React.FC = () => {
  const {
    wizardState: { nodeName },
  } = useWizard();
  return (
    <EmptyState>
      <Title headingLevel="h4" size="lg">
        {`Add node "${nodeName}" progress`}
      </Title>
      <Progress
        value={50}
        title="Creating resource"
        measureLocation={ProgressMeasureLocation.none}
      />
    </EmptyState>
  );
};
