import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
  WizardContextConsumer,
} from "@patternfly/react-core";
import { pallete } from "app/view";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import { useWizard } from "../useWizard";

export const ResourceCreateFinishError: React.FC = () => {
  const {
    wizardState: { resourceName },
    close,
  } = useWizard();
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
        <Title headingLevel="h4" size="lg">
          {`Communication error while creating the resource "${resourceName}"`}
        </Title>
        <EmptyStateBody>
          A communication error occurred while creating the resource (details in
          the browser console). You can try to perform the operation again.
        </EmptyStateBody>
        <WizardContextConsumer>
          {({ goToStepByName }) => (
            <Button variant="primary" onClick={() => goToStepByName("Review")}>
              Try again
            </Button>
          )}
        </WizardContextConsumer>
        <EmptyStateSecondaryActions>
          <Button variant="link" onClick={close}>
            Cancel
          </Button>
        </EmptyStateSecondaryActions>
      </EmptyState>
    </>
  );
};
