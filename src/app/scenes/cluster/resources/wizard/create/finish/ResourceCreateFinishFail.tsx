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
import { ExclamationCircleIcon } from "@patternfly/react-icons";

import { WizardLibReports, pallete } from "app/view";

import { useWizard } from "../useWizard";

export const ResourceCreateFinishFail: React.FC = () => {
  const {
    wizardState: { resourceName, reports },
    close,
  } = useWizard();
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
        <Title headingLevel="h4" size="lg">
          {`Create resource "${resourceName}" failed`}
        </Title>
        <EmptyStateBody>
          Create resource failed in the backend (see messages below). You can
          return back, correct values and try to create resource again. The
          messages will be kept in the wizard.
        </EmptyStateBody>
        <WizardContextConsumer>
          {({ goToStepByName }) => (
            <Button
              variant="primary"
              onClick={() => goToStepByName("Name and type")}
            >
              Back to first step
            </Button>
          )}
        </WizardContextConsumer>
        <EmptyStateSecondaryActions>
          <Button variant="link" onClick={close}>
            Cancel
          </Button>
        </EmptyStateSecondaryActions>
      </EmptyState>
      <WizardLibReports reports={reports} />
    </>
  );
};
