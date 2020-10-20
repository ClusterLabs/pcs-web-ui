import React from "react";
import {
  Alert,
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";

import { WizardLibStep } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddPrepareNode: React.FC = () => {
  const {
    useNodeCheck,
    wizardState: { nodeCheck },
  } = useWizard();
  useNodeCheck();
  return (
    <WizardLibStep title="Prepare node">
      {(nodeCheck === "started-can-add" || nodeCheck === "started-auth") && (
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon variant="container" component={Spinner} />
          <Title size="lg" headingLevel="h3">
            {nodeCheck === "started-can-add"
              ? "Checking if can add node to cluster"
              : "Checking if node is authenticated"}
          </Title>
        </EmptyState>
      )}

      {nodeCheck === "success" && (
        <Alert
          variant="success"
          isInline
          title="The node is prepared for adding to the cluster."
        />
      )}
    </WizardLibStep>
  );
};
