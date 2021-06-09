import React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";

export const TaskProgress: React.FC<{
  title: React.ReactNode;
  progressTitle?: string;
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
