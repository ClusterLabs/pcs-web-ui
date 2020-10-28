import React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";

import { useWizard } from "../useWizard";

export const ResourceCreateFinishProgress: React.FC = () => {
  const {
    state: { resourceName },
  } = useWizard();
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
