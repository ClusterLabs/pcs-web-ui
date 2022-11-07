import {Badge, Icon} from "@patternfly/react-core";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

import {Node} from "app/view/cluster/types";
import {Link, location, useSelectedClusterName} from "app/view/share";

import {SingleNodeView} from "./SingleNodeView";
import {NodeAgregationInfo} from "./NodeAgregationInfo";

export const NodesCard = ({nodeList}: {nodeList: Node[]}) => {
  const clusterName = useSelectedClusterName();

  if (nodeList.length === 1) {
    return <SingleNodeView singleNode={nodeList[0]} />;
  }

  const nodeListLink = (
    <Link isInline to={location.nodeList({clusterName})}>
      nodes
    </Link>
  );

  if (nodeList.every(n => n.status === "ONLINE" && n.quorum)) {
    return (
      <>
        <div className="pf-u-mb-md">
          There are <Badge isRead>{nodeList.length}</Badge> {nodeListLink} in
          the cluster.
        </div>
        <div>
          <Icon isInline status="success">
            <CheckCircleIcon />
          </Icon>{" "}
          Everything is running.
        </div>
      </>
    );
  }

  const statistics = nodeList.reduce(
    (statistics, node) => {
      const newStatistics = {...statistics};
      if (node.status === "OFFLINE") {
        newStatistics.offline.push(node.name);
      }
      if (node.status === "STANDBY") {
        newStatistics.standby.push(node.name);
      }
      if (node.status === "DATA_NOT_PROVIDED") {
        newStatistics.unknown.push(node.name);
      }
      if (node.status === "ONLINE" && !node.quorum) {
        newStatistics.onlineWithoutQuorum.push(node.name);
      }
      return newStatistics;
    },
    {
      offline: [] as string[],
      standby: [] as string[],
      unknown: [] as string[],
      onlineWithoutQuorum: [] as string[],
    },
  );

  return (
    <>
      <div className="pf-u-mb-md">
        There are <Badge isRead>{nodeList.length}</Badge> {nodeListLink} in the
        cluster.
      </div>
      <NodeAgregationInfo
        color="red"
        icon={<ExclamationCircleIcon />}
        agregationName="offline"
        nodeNameList={statistics.offline}
      />
      <NodeAgregationInfo
        color="orange"
        icon={<ExclamationTriangleIcon />}
        agregationName="standby"
        nodeNameList={statistics.standby}
      />
      <NodeAgregationInfo
        color="orange"
        icon={<ExclamationTriangleIcon />}
        agregationName="without quorum"
        nodeNameList={statistics.onlineWithoutQuorum}
      />
      <NodeAgregationInfo
        color="orange"
        icon={<ExclamationTriangleIcon />}
        agregationName="unknown"
        nodeNameList={statistics.unknown}
      />
    </>
  );
};
