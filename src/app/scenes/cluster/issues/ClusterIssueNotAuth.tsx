import React from "react";
import { Alert, AlertActionLink, Button, Modal } from "@patternfly/react-core";

import { EmptyStateSpinner, NodesAuthForm } from "app/view";

import { ClusterIssueNotAuthButton } from "./ClusterIssueNotAuthButton";
import { useFixAuth } from "./useFixAuth";

export const ClusterIssueNotAuth: React.FC<{ nodeList: string[] }> = ({
  nodeList,
}) => {
  const {
    dispatch,
    clusterUrlName,
    state: { authProcessId, open, fixing, errorMessage },
  } = useFixAuth();

  const cancel = () =>
    dispatch({
      type: "CLUSTER.FIX_AUTH.CANCEL",
      payload: { clusterUrlName },
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
            payload: { clusterUrlName },
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
                payload: {
                  initialNodeList: nodeList,
                  clusterUrlName,
                },
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
            <EmptyStateSpinner title="Distributing auth tokens to cluster" />
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
