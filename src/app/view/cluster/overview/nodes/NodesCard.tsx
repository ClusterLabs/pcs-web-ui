import {Icon} from "@patternfly/react-core";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

import {Node} from "app/view/cluster/types";
import {Link, location, useLoadedCluster} from "app/view/share";
import {StatisticsIssueInfo} from "app/view/cluster/overview/StatisticsIssueInfo";

import {SingleNodeView} from "./SingleNodeView";

export const NodesCard = ({nodeList}: {nodeList: Node[]}) => {
  const {clusterName} = useLoadedCluster();

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
          There are <strong>{nodeList.length}</strong> {nodeListLink} in the
          cluster.
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

  const createNodeLink = (nodeName: string) => (
    <Link isInline to={location.node({clusterName, nodeName})} />
  );

  return (
    <>
      <div className="pf-u-mb-md">
        There are <strong>{nodeList.length}</strong> {nodeListLink} in the
        cluster.
      </div>
      <StatisticsIssueInfo
        color="red"
        icon={<ExclamationCircleIcon />}
        issueName="offline"
        itemList={statistics.offline}
        createItemLabel={createNodeLink}
      />
      <StatisticsIssueInfo
        color="orange"
        icon={<ExclamationTriangleIcon />}
        issueName="standby"
        itemList={statistics.standby}
        createItemLabel={createNodeLink}
      />
      <StatisticsIssueInfo
        color="orange"
        icon={<ExclamationTriangleIcon />}
        issueName="without quorum"
        itemList={statistics.onlineWithoutQuorum}
        createItemLabel={createNodeLink}
      />
      <StatisticsIssueInfo
        color="orange"
        icon={<ExclamationTriangleIcon />}
        issueName="unknown"
        itemList={statistics.unknown}
        createItemLabel={createNodeLink}
      />
    </>
  );
};
