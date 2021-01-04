import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";
import { EmptyStateSpinner, NodesAuthForm } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddPrepareNode: React.FC = () => {
  const {
    useNodeCheck,
    checkCanAddNode,
    checkAuth,
    state: { nodeCheck, nodeCheckMessage, reports, authProcessId },
  } = useWizard();
  useNodeCheck();
  return (
    <WizardLibStep title="Prepare node" reports={reports}>
      {(nodeCheck === "can-add-started"
        || nodeCheck === "auth-check-started"
        || nodeCheck === "send-known-hosts-started") && (
        <EmptyStateSpinner
          title={
            {
              "can-add-started": "Checking if can add node to cluster",
              "auth-check-started": "Checking if node is authenticated",
              "send-known-hosts-started":
                "Sending updated known host to cluster",
            }[nodeCheck]
          }
        />
      )}

      {nodeCheck === "can-add-failed" && (
        <Alert
          variant="danger"
          isInline
          title="Check that node is not evided in some cluster"
          actionLinks={
            <AlertActionLink onClick={checkCanAddNode}>
              Try again
            </AlertActionLink>
          }
        >
          {nodeCheckMessage}
        </Alert>
      )}

      {nodeCheck === "auth-check-failed" && (
        <Alert
          variant="danger"
          isInline
          title="Check if node is authenticated"
          actionLinks={
            <AlertActionLink onClick={checkAuth}>Try again</AlertActionLink>
          }
          data-test="prepare-cluster-for-node-auth-failed"
        >
          {nodeCheckMessage}
        </Alert>
      )}

      {nodeCheck === "can-add-cannot" && (
        <Alert
          variant="danger"
          isInline
          title={nodeCheckMessage}
          data-test="prepare-cluster-for-node-cannot-add"
        />
      )}

      {authProcessId && (
        <>
          <Alert
            isInline
            variant="warning"
            title={"Node is not authenticated. Please authenticate it."}
          />
          <NodesAuthForm authProcessId={authProcessId} />
        </>
      )}

      {nodeCheck === "success" && (
        <Alert
          variant="success"
          isInline
          title="The node is prepared for adding to the cluster."
          data-test="prepare-cluster-for-node-success"
        />
      )}
    </WizardLibStep>
  );
};
