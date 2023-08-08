import {Alert} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {IssueList, Table} from "app/view/share";

import {Cluster} from "./types";
import {DashboardCluster} from "./DashboardCluster";
import {DashboardClusterNodes} from "./DashboardClusterNodes";
import {DashboardClusterResources} from "./DashboardClusterResources";
import {DashboardClusterFenceDevices} from "./DashboardClusterFenceDevices";
import {DashboardClusterCellSummary} from "./DashboardClusterCellSummary";
import {DashboardClusterMenu} from "./DashboardClusterMenu";

const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
  ACTIONS: "ACTIONS",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

const {loaded} = testMarks.dashboard.clusterList.cluster;

export const DashboardClusterLoaded = ({cluster}: {cluster: Cluster}) => {
  const {expanded, Toggle, Content} = Table.Expansion.useExpansion({
    contentSpan: CELL_COUNT,
  });

  return (
    <DashboardCluster
      clusterName={cluster.name}
      status={cluster.status}
      columns={
        <>
          <Toggle expandKey={COLUMNS.ISSUES} {...loaded.issuesCount.mark}>
            <DashboardClusterCellSummary
              itemsCount={cluster.issueList.length}
              summaryStatus={cluster.summary.issuesSeverity}
            />
          </Toggle>
          <Toggle expandKey={COLUMNS.NODES} {...loaded.nodes.mark}>
            <DashboardClusterCellSummary
              itemsCount={cluster.nodeList.length}
              summaryStatus={cluster.summary.nodesSeverity}
            />
          </Toggle>
          <Toggle expandKey={COLUMNS.RESOURCES} {...loaded.resources.mark}>
            <DashboardClusterCellSummary
              itemsCount={
                cluster.hasCibInfo ? cluster.resourceTree.length : "?"
              }
              summaryStatus={cluster.summary.resourcesSeverity}
            />
          </Toggle>
          <Toggle
            expandKey={COLUMNS.FENCE_DEVICES}
            {...loaded.fenceDevices.mark}
          >
            <DashboardClusterCellSummary
              itemsCount={
                cluster.hasCibInfo ? cluster.fenceDeviceList.length : "?"
              }
              summaryStatus={cluster.summary.fenceDevicesSeverity}
            />
          </Toggle>
          <td>
            <DashboardClusterMenu clusterName={cluster.name} />
          </td>
        </>
      }
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      expandedContent={
        <>
          <Content expandKey={COLUMNS.ISSUES}>
            <IssueList
              margin
              issueList={cluster.issueList}
              displayIssue={issue => (
                <Alert
                  isInline
                  variant={issue.severity === "ERROR" ? "danger" : "warning"}
                  title={
                    <span {...loaded.issue.message.mark}>{issue.message}</span>
                  }
                  {...loaded.issue.mark}
                />
              )}
            />
          </Content>
          <Content expandKey={COLUMNS.NODES}>
            <DashboardClusterNodes cluster={cluster} />
          </Content>
          <Content expandKey={COLUMNS.RESOURCES}>
            <DashboardClusterResources cluster={cluster} />
          </Content>
          <Content expandKey={COLUMNS.FENCE_DEVICES}>
            <DashboardClusterFenceDevices cluster={cluster} />
          </Content>
        </>
      }
    />
  );
};
