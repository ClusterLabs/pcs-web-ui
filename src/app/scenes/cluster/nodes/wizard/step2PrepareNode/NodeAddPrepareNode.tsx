import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";
import { EmptyStateSpinner, NodeAuthForm } from "app/view";

import { useWizard } from "../useWizard";

export const NodeAddPrepareNode: React.FC = () => {
  const {
    useNodeCheck,
    nodeAuth,
    checkCanAddNode,
    checkAuth,
    state: { nodeCheck, nodeCheckMessage },
  } = useWizard();
  useNodeCheck();
  return (
    <WizardLibStep title="Prepare node">
      {(nodeCheck === "started-can-add"
        || nodeCheck === "started-auth"
        || nodeCheck === "started-send-known-hosts") && (
        <EmptyStateSpinner
          title={
            {
              "started-can-add": "Checking if can add node to cluster",
              "started-auth": "Checking if node is authenticated",
              "started-send-known-hosts":
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

      {nodeCheck === "auth-failed" && (
        <Alert
          variant="danger"
          isInline
          title="Check if node is authenticated"
          actionLinks={
            <AlertActionLink onClick={checkAuth}>Try again</AlertActionLink>
          }
        >
          {nodeCheckMessage}
        </Alert>
      )}

      {nodeCheck === "cannot-add" && (
        <Alert variant="danger" isInline title={nodeCheckMessage} />
      )}

      {(nodeCheck === "auth-required"
        || nodeCheck === "auth-progress"
        || nodeCheck === "auth-bad-info") && (
        <NodeAuthForm
          authenticationInProgress={nodeCheck === "auth-progress"}
          authenticationError={
            nodeCheck === "auth-bad-info"
              ? "Wrong authentication data"
              : nodeCheckMessage
          }
          onSend={nodeAuth}
          canTryAgain={nodeCheck !== "auth-bad-info"}
        />
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
