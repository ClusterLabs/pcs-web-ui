import {TaskButtonWizardNext} from "app/view/share/task";

import {useNodesAuth} from "./useNodesAuth";

export const NodesAuthNext = (props: {
  authProcessId: number;
  "data-test"?: string;
}) => {
  const {
    nodeAuth,
    state: {sending},
  } = useNodesAuth(props.authProcessId);
  return (
    <TaskButtonWizardNext
      action={nodeAuth}
      label="Authenticate"
      disabled={sending}
      data-test={props["data-test"]}
    />
  );
};
