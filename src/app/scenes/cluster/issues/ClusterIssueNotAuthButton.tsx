import React from "react";
import { Button } from "@patternfly/react-core";

import { useNodesAuth } from "app/view";

export const ClusterIssueNotAuthButton: React.FC<{
  authProcessId: number;
}> = ({ authProcessId }) => {
  const { nodeAuth } = useNodesAuth(authProcessId);
  return (
    <Button variant="primary" onClick={nodeAuth}>
      Authenticate
    </Button>
  );
};
