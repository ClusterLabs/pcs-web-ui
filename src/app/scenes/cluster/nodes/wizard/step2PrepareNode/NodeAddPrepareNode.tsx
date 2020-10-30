import React from "react";
import { Alert } from "@patternfly/react-core";

import { WizardLibStep } from "app/view";
import { NodeAuthForm } from "app/view";

import { useWizard } from "../useWizard";

import { NodeAddPrepareNodeWaiting } from "./NodeAddPrepareNodeWaiting";

export const NodeAddPrepareNode: React.FC = () => {
  const {
    useNodeCheck,
    nodeAuth,
    state: { nodeCheck, nodeCheckMessage },
  } = useWizard();
  useNodeCheck();
  return (
    <WizardLibStep title="Prepare node">
      {(nodeCheck === "started-can-add"
        || nodeCheck === "started-auth"
        || nodeCheck === "started-send-known-hosts") && (
        <NodeAddPrepareNodeWaiting
          message={
            {
              "started-can-add": "Checking if can add node to cluster",
              "started-auth": "Checking if node is authenticated",
              "started-send-known-hosts":
                "Sending updated known host to cluster",
            }[nodeCheck]
          }
        />
      )}

      {(nodeCheck === "cannot-add" || nodeCheck === "auth-failed") && (
        <Alert variant="danger" isInline title={nodeCheckMessage} />
      )}

      {nodeCheck === "success" && (
        <Alert
          variant="success"
          isInline
          title="The node is prepared for adding to the cluster."
        />
      )}

      {(nodeCheck === "auth-required" || nodeCheck === "auth-progress") && (
        <NodeAuthForm
          authenticationInProgress={nodeCheck === "auth-progress"}
          authenticationError={nodeCheckMessage}
          onSend={nodeAuth}
        />
      )}
    </WizardLibStep>
  );
};
