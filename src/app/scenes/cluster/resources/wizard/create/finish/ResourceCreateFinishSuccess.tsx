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

export const ResourceCreateFinishSuccess: React.FC = () => {
  const {
    wizardState: { resourceName, reports },
    close,
  } = useWizardState();
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
        <Title headingLevel="h4" size="lg">
          {`Resource "${resourceName}" created successfully`}
        </Title>
        <Button variant="primary" onClick={close}>
          Close
        </Button>
      </EmptyState>
      <WizardLibReports reports={reports} />
    </>
  );
};
