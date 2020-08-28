import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { CheckCircleIcon } from "@patternfly/react-icons";
import { WizardLibReports, pallete } from "app/view";
import { useWizardState } from "../useWizardState";

export const ResourceCreateFinishSuccess: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const {
    wizardState: { resourceName, reports },
  } = useWizardState();
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
        <Title headingLevel="h4" size="lg">
          {`Resource "${resourceName}" created successfully`}
        </Title>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </EmptyState>
      <WizardLibReports reports={reports} />
    </>
  );
};
