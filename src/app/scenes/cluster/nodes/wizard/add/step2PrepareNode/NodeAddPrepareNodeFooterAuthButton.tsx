import React from "react";

import { WizardButtonNext, useNodesAuth } from "app/view";

export const NodeAddPrepareNodeFooterAuthButton: React.FC<{
  authProcessId: number;
}> = ({ authProcessId }) => {
  const { nodeAuth } = useNodesAuth(authProcessId);
  return <WizardButtonNext label="Authenticate" onClick={nodeAuth} />;
};
