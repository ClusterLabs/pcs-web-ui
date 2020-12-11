import React from "react";
import { Alert, AlertActionLink } from "@patternfly/react-core";

import { ClusterIssueNotAuthForm } from "./ClusterIssueNotAuthForm";

export const ClusterIssueNotAuth: React.FC<{ nodeList: string[] }> = ({
  nodeList,
}) => {
  const [fixing, setFixing] = React.useState(false);

  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink onClick={() => setFixing(true)}>
            Fix authentication
          </AlertActionLink>
        }
        data-test={"cluster-issue-nodes-not-auth"}
      >
        Unauthenticated nodes:{" "}
        <span> {[...new Set(nodeList)].join(", ")} </span>
      </Alert>
      {fixing && (
        <ClusterIssueNotAuthForm
          cancel={() => setFixing(false)}
          initialNodeList={nodeList}
        />
      )}
    </>
  );
};
