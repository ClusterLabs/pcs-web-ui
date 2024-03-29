import {Button} from "@patternfly/react-core";

import {useNodesAuth} from "app/view/share";

export const ClusterIssueNotAuthButton = ({
  authProcessId,
  isDisabled = false,
}: {
  authProcessId: number;
  isDisabled?: boolean;
}) => {
  const {nodeAuth} = useNodesAuth(authProcessId);
  return (
    <Button variant="primary" isDisabled={isDisabled} onClick={nodeAuth}>
      Authenticate
    </Button>
  );
};
