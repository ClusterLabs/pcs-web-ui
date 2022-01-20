import React from "react";

import { WizardFooter } from "app/view/share/task";

import { useNodesAuth } from "./useNodesAuth";

export const NodeAuthWizardFooter = ({
  authProcessId,
  task,
  onClose,
}: {
  authProcessId: number;
  task: React.ComponentProps<typeof WizardFooter>["next"]["task"];
  onClose: React.ComponentProps<typeof WizardFooter>["onClose"];
}) => {
  const {
    nodeAuth,
    state: { sending },
  } = useNodesAuth(authProcessId);

  return (
    <WizardFooter
      next={{
        action: nodeAuth,
        label: "Authenticate",
        disabled: sending,
        task: task,
      }}
      onClose={onClose}
    />
  );
};
