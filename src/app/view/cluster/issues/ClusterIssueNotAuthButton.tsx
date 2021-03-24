import React from "react";
import { Button } from "@patternfly/react-core";

import { useNodesAuth } from "app/view/share";

export const ClusterIssueNotAuthButton: React.FC<{
  authProcessId: number;
  isDisabled?: boolean;
}> = ({ authProcessId, isDisabled = false }) => {
  const { nodeAuth } = useNodesAuth(authProcessId);
  return (
    <Button
      variant="primary"
      isDisabled={isDisabled}
      onClick={nodeAuth}
      data-test="task-fix-no-auth-nodes-button-auth"
    >
      Authenticate
    </Button>
  );
};
