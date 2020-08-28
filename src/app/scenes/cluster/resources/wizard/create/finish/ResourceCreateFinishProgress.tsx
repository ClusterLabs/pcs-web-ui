import React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";
import { useWizardState } from "../useWizardState";

export const ResourceCreateFinishProgress: React.FC = () => {
  const {
    wizardState: { resourceName },
  } = useWizardState();
  return (
    <EmptyState>
      <Title headingLevel="h4" size="lg">
        {`Create new resource "${resourceName}" progress`}
      </Title>
      <Progress
        value={50}
        title="Creating resource"
        measureLocation={ProgressMeasureLocation.none}
      />
    </EmptyState>
  );
};
