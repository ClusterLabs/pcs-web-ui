import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateIcon,
  Progress,
  ProgressMeasureLocation,
  Title,
} from "@patternfly/react-core";
import { CheckCircleIcon } from "@patternfly/react-icons";

import { selectors } from "app/store";
import { pallete, useClusterSelector } from "app/view";

export const ResourceCreateProgress: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [{ resourceName, response }] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  switch (response) {
    case "success":
      return (
        <EmptyState>
          <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
          <Title headingLevel="h4" size="lg">
            {`Resource "${resourceName}" created successfully`}
          </Title>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </EmptyState>
      );
    default:
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
  }
};
