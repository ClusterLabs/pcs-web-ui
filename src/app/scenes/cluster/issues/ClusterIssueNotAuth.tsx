import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { ClusterIssueNotAuthForm } from "./ClusterIssueNotAuthForm";
import { useAuth } from "./useAuth";

export const ClusterIssueNotAuth: React.FC<{ nodeList: string[] }> = ({
  nodeList,
}) => {
  const [fixing, setFixing] = React.useState(false);
  const { start } = useAuth();

  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink
            onClick={() => {
              setFixing(true);
              start(nodeList);
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
      {fixing && <ClusterIssueNotAuthForm cancel={() => setFixing(false)} />}
    </>
  );
};
