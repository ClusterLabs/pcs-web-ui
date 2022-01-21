import { WizardFooter } from "app/view/share/task";

import { useNodesAuth } from "./useNodesAuth";

export const NodeAuthWizardFooter = ({
  authProcessId,
}: {
  authProcessId: number;
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
      }}
    />
  );
};
