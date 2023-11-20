import {Alert, AlertActionLink} from "@patternfly/react-core";

import {useOpenTask} from "app/view/task";
import {useLoadedCluster} from "app/view/cluster/share";

export const ClusterIssueNotAuth = ({nodeList}: {nodeList: string[]}) => {
  const openTask = useOpenTask();
  const {clusterName} = useLoadedCluster();
  return (
    <>
      <Alert
        isInline
        variant={"warning"}
        title="Cluster is not authenticated against nodes"
        actionLinks={
          <AlertActionLink
            onClick={() =>
              openTask("fixAuth", {
                type: "CLUSTER.FIX_AUTH.START",
                key: {clusterName},
                payload: {clusterName, initialNodeList: nodeList},
              })
            }
          >
            Fix authentication
          </AlertActionLink>
        }
      >
        Unauthenticated nodes:{" "}
        <span> {[...new Set(nodeList)].join(", ")} </span>
      </Alert>
    </>
  );
};
