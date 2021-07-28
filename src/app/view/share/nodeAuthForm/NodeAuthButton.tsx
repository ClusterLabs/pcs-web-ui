import React from "react";

import { TaskButtonNext } from "app/view/share/task";

import { useNodesAuth } from "./useNodesAuth";

export const NodeAuthButton: React.FC<{
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
