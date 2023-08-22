import {Alert, AlertActionLink} from "@patternfly/react-core";

import {
  NodesAuthCustomAddrSwitch,
  NodesAuthForm,
  NodesAuthInputAddress,
  NodesAuthInputPassword,
  NodesAuthInputPort,
} from "app/view/share";
import {TaskSimple} from "app/view/share";

import {useTask} from "./useTask";
import {ClusterIssueNotAuthFooter} from "./ClusterIssueNotAuthFooter";
import {ClusterIssueNotAuthFinish} from "./ClusterIssueNotAuthFinish";

export const ClusterIssueNotAuth = ({nodeList}: {nodeList: string[]}) => {
  const {clusterName, open, cancel, authProcessId, fixAuthStart} = useTask();
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
      >
        Unauthenticated nodes:{" "}
        <span> {[...new Set(nodeList)].join(", ")} </span>
      </Alert>
      {open && (
        <TaskSimple
          taskLabel="Authentication of nodes"
          task="fixAuth"
          clusterName={clusterName}
          close={cancel}
          footer={<ClusterIssueNotAuthFooter />}
        >
          {authProcessId === null && <ClusterIssueNotAuthFinish />}
          {authProcessId !== null && (
            <NodesAuthForm
              authProcessId={authProcessId}
              customAddresSwitcher={<NodesAuthCustomAddrSwitch />}
              inputPassword={(nodeName, elementId, index) => (
                <NodesAuthInputPassword
                  index={index}
                  nodeName={nodeName}
                  elementId={elementId}
                />
              )}
              inputAddress={(nodeName, elementId) => (
                <NodesAuthInputAddress
                  nodeName={nodeName}
                  elementId={elementId}
                />
              )}
              inputPort={(nodeName, elementId) => (
                <NodesAuthInputPort nodeName={nodeName} elementId={elementId} />
              )}
            />
          )}
        </TaskSimple>
      )}
    </>
  );
};
