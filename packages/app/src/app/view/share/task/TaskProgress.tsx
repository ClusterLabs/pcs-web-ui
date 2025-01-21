import type React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";

export const TaskProgress = ({
  title,
  progressTitle,
}: {
  title: React.ReactNode;
  progressTitle?: string;
}) => {
  return (
    <EmptyState>
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      <Progress
        value={50}
        title={progressTitle}
        aria-label="task progress"
        measureLocation={ProgressMeasureLocation.none}
      />
    </EmptyState>
  );
};
