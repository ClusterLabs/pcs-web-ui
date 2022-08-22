import { Alert, AlertActionLink } from "@patternfly/react-core";

import { NodesAuthForm } from "app/view/share";
import { TaskSimple } from "app/view/share";

import { useTask } from "./useTask";
import { ClusterIssueNotAuthFooter } from "./ClusterIssueNotAuthFooter";
import { ClusterIssueNotAuthFinish } from "./ClusterIssueNotAuthFinish";

export const ClusterIssueNotAuth = ({ nodeList }: { nodeList: string[] }) => {
  const { open, cancel, authProcessId, fixAuthStart } = useTask();
  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink onClick={() => fixAuthStart(nodeList)}>
            Fix authentication
          </AlertActionLink>
        }
        data-test={"cluster-issue-nodes-not-auth"}
      >
        Unauthenticated nodes:{" "}
        <span> {[...new Set(nodeList)].join(", ")} </span>
      </Alert>
      {open && (
        <TaskSimple
          title="Authentication of nodes"
          task="fixAuth"
          close={cancel}
          footer={<ClusterIssueNotAuthFooter />}
        >
          {authProcessId === null && <ClusterIssueNotAuthFinish />}
          {authProcessId !== null && (
            <NodesAuthForm authProcessId={authProcessId} />
          )}
        </TaskSimple>
      )}
    </>
  );
};
