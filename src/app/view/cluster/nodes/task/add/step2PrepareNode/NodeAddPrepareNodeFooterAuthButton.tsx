import React from "react";

import { TaskButtonNext, useNodesAuth } from "app/view/share";

export const NodeAddPrepareNodeFooterAuthButton: React.FC<{
  authProcessId: number;
}> = ({ authProcessId }) => {
  const {
    nodeAuth,
    state: { sending },
  } = useNodesAuth(authProcessId);
  return (
    <TaskButtonNext
      label="Authenticate"
      onClick={nodeAuth}
      data-test="button-auth"
      disabled={sending}
    />
  );
};
