import React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";

export const WizardProgress: React.FC<{
  title: string;
  progressTitle: string;
}> = ({ title, progressTitle }) => {
  return (
    <EmptyState>
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      <Progress
        value={50}
        title={progressTitle}
        measureLocation={ProgressMeasureLocation.none}
      />
    </EmptyState>
  );
};
