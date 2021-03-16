import React from "react";
import { Alert, AlertActionLink, Button, Modal } from "@patternfly/react-core";

import { EmptyStateSpinner, NodesAuthForm } from "app/view";
import { selectors, useDispatch } from "app/store";
import { useClusterSelector } from "app/view/useClusterSelector";

import { ClusterIssueNotAuthButton } from "./ClusterIssueNotAuthButton";

export const ClusterIssueNotAuth: React.FC<{ nodeList: string[] }> = ({
  nodeList,
}) => {
  const dispatch = useDispatch();
  const [
    { authProcessId, open, fixing, errorMessage, authAttemptInProgress },
    clusterName,
  ] = useClusterSelector(selectors.getFixAuth);

  const cancel = () =>
    dispatch({
      type: "CLUSTER.FIX_AUTH.CANCEL",
      key: { clusterName },
    });

  let actions = [
    <Button key="Close" variant="primary" onClick={cancel}>
      Close
    </Button>,
  ];
  if (authProcessId) {
    actions = [
      <ClusterIssueNotAuthButton
        key="Authenticate"
        authProcessId={authProcessId}
        isDisabled={authAttemptInProgress}
      />,
      <Button key="Cancel" variant="link" onClick={cancel}>
        Cancel
      </Button>,
    ];
  } else if (fixing) {
    actions = [];
  } else if (errorMessage.length > 0) {
    actions = [
      <Button
        key="TryAgain"
        variant="primary"
        onClick={() =>
          dispatch({
            type: "CLUSTER.FIX_AUTH.AUTH_DONE",
            key: { clusterName },
          })
        }
      >
        Try again
      </Button>,
      <Button key="Cancel" variant="link" onClick={cancel}>
        Cancel
      </Button>,
    ];
  }

  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink
            onClick={() => {
              dispatch({
                type: "CLUSTER.FIX_AUTH.START",
                key: { clusterName },
                payload: { initialNodeList: nodeList },
              });
            }}
          >
            Fix authentication
          </AlertActionLink>
        }
        data-test={"cluster-issue-nodes-not-auth"}
      >
        Unauthenticated nodes:{" "}
        <span> {[...new Set(nodeList)].join(", ")} </span>
      </Alert>
      {open && (
        <Modal
          variant="large"
          title="Authentication of nodes"
          isOpen
          onClose={cancel}
          actions={actions}
        >
          {authProcessId && <NodesAuthForm authProcessId={authProcessId} />}
          {!authProcessId && fixing && (
            <EmptyStateSpinner title="Distributing auth tokens to the cluster" />
          )}
          {!authProcessId && !fixing && errorMessage.length > 0 && (
            <Alert
              isInline
              variant="danger"
              title="Distribution of auth tokens to cluster failed"
            >
              {errorMessage}
            </Alert>
          )}
          {!authProcessId && !fixing && errorMessage.length === 0 && (
            <Alert
              isInline
              variant="success"
              title="Authentication sucessfully fixed"
            />
          )}
        </Modal>
      )}
    </>
  );
};
