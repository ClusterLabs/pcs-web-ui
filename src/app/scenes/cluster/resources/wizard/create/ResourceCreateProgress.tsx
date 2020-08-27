import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Progress,
  ProgressMeasureLocation,
  Title,
  WizardContextConsumer,
} from "@patternfly/react-core";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@patternfly/react-icons";

import { types } from "app/store";
import { pallete } from "app/view";

import { ResourceCreateReports } from "./ResourceCreateReports";

export const ResourceCreateProgress: React.FC<{
  wizardState: types.wizardResourceCreate.WizardResourceCreate;
  onClose: () => void;
}> = ({ onClose, wizardState: { resourceName, response } }) => {
  switch (response) {
    case "success":
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
          <ResourceCreateReports />
        </>
      );
    case "fail":
      return (
        <>
          <EmptyState>
            <EmptyStateIcon
              icon={ExclamationCircleIcon}
              color={pallete.ERROR}
            />
            <Title headingLevel="h4" size="lg">
              {`Create resource "${resourceName}" failed`}
            </Title>
            <EmptyStateBody>
              Create resource failed in the backend (see messages below). You
              can return back, correct values and try to create resource again.
              The messages will be kept in wizard.
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
              <Button variant="link" onClick={onClose}>
                Cancel
              </Button>
            </EmptyStateSecondaryActions>
          </EmptyState>
          <ResourceCreateReports />
        </>
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
