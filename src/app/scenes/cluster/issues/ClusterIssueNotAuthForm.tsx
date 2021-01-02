import React from "react";
import { Button, Modal } from "@patternfly/react-core";

import { NodesAuthForm, useNodesAuth } from "app/view";

export const ClusterIssueNotAuthForm: React.FC<{
  authProcessId: number;
  cancel: () => void;
}> = ({ cancel, authProcessId }) => {
  const {
    state: { nodeMap },
    nodeAuth,
  } = useNodesAuth(authProcessId);
  return (
    <Modal
      variant="large"
      title="Authentication of nodes"
      isOpen
      onClose={cancel}
      actions={
        Object.keys(nodeMap).length === 0
          ? [
              <Button key="Cancel" variant="primary" onClick={cancel}>
                Close
              </Button>,
            ]
          : [
              <Button key="Authenticate" variant="primary" onClick={nodeAuth}>
                Authenticate
              </Button>,
              <Button key="Cancel" variant="link" onClick={cancel}>
                Cancel
              </Button>,
            ]
      }
    >
      <NodesAuthForm authProcessId={authProcessId} />
    </Modal>
  );
};
