import React from "react";
import { Alert, Button } from "@patternfly/react-core";

import { NodesAuthForm, useNodesAuth } from "app/view";

export const AddClusterStepAuthForm: React.FC<{
  authProcessId: number;
}> = ({ authProcessId }) => {
  const { nodeAuth } = useNodesAuth(authProcessId);
  return (
    <>
      <Alert
        isInline
        variant="warning"
        title={"Node is not authenticated. Please authenticate it."}
      />
      <NodesAuthForm authProcessId={authProcessId} />
      <Button variant="primary" data-test="auth-check" onClick={nodeAuth}>
        Authenticate node
      </Button>
    </>
  );
};
