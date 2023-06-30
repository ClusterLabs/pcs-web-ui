import {WizardFooterNext} from "app/view/share/task";

import {useNodesAuth} from "./useNodesAuth";

export const NodesAuthWizardNext = (props: {
  authProcessId: number;
  "data-test"?: string;
}) => {
  const {
    nodeAuth,
    state: {sending},
  } = useNodesAuth(props.authProcessId);
  return (
    <WizardFooterNext
      action={nodeAuth}
      label="Authenticate"
      disabled={sending}
      data-test={props["data-test"]}
    />
  );
};
