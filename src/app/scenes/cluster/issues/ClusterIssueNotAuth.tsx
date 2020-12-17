import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { actionNewId, useDispatch } from "app/store";

import { ClusterIssueNotAuthForm } from "./ClusterIssueNotAuthForm";

export const ClusterIssueNotAuth: React.FC<{ nodeList: string[] }> = ({
  nodeList,
}) => {
  const dispatch = useDispatch();
  const [authProcessId, setAuthProcessId] = React.useState<number | null>(null);

  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink
            onClick={() => {
              const processId = actionNewId();
              setAuthProcessId(processId);

              dispatch({
                type: "NODE.AUTH.START",
                payload: {
                  processId,
                  initialNodeList: nodeList,
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
      {authProcessId && (
        <ClusterIssueNotAuthForm
          cancel={() => setAuthProcessId(null)}
          authProcessId={authProcessId}
        />
      )}
    </>
  );
};
