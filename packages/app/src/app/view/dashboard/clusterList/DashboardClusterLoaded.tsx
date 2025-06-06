import type React from "react";
import {Alert} from "@patternfly/react-core";
import {Td} from "@patternfly/react-table";

import {testMarks} from "app/view/dataTest";
import {IssueList, Table} from "app/view/share";

import type {Cluster} from "./types";
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

const {cluster} = testMarks.dashboard.clusterList;

export const DashboardClusterLoaded = (props: {
  cluster: Cluster;
  status: React.ReactNode;
  isEven: boolean;
}) => {
  const {expanded, Toggle, Content} = Table.Expansion.useExpansion({
    contentSpan: CELL_COUNT,
  });

  return (
    <DashboardCluster
      clusterName={props.cluster.name}
      status={props.status}
      isEven={props.isEven}
      columns={
        <>
          <Toggle expandKey={COLUMNS.ISSUES} {...cluster.issuesCount.mark}>
            <DashboardClusterCellSummary
              itemsCount={props.cluster.issueList.length}
              summaryStatus={props.cluster.summary.issuesSeverity}
            />
          </Toggle>
          <Toggle expandKey={COLUMNS.NODES} {...cluster.nodeCount.mark}>
            <DashboardClusterCellSummary
              itemsCount={props.cluster.nodeList.length}
              summaryStatus={props.cluster.summary.nodesSeverity}
            />
          </Toggle>
          <Toggle expandKey={COLUMNS.RESOURCES} {...cluster.resourceCount.mark}>
            <DashboardClusterCellSummary
              itemsCount={
                props.cluster.hasCibInfo
                  ? props.cluster.resourceTree.length
                  : "?"
              }
              summaryStatus={props.cluster.summary.resourcesSeverity}
            />
          </Toggle>
          <Toggle
            expandKey={COLUMNS.FENCE_DEVICES}
            {...cluster.fenceDeviceCount.mark}
          >
            <DashboardClusterCellSummary
              itemsCount={
                props.cluster.hasCibInfo
                  ? props.cluster.fenceDeviceList.length
                  : "?"
              }
              summaryStatus={props.cluster.summary.fenceDevicesSeverity}
            />
          </Toggle>
          <Td>
            <DashboardClusterMenu clusterName={props.cluster.name} />
          </Td>
        </>
      }
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      expandedContent={
        <>
          <Content expandKey={COLUMNS.ISSUES} isEven={props.isEven}>
            <IssueList
              margin
              issueList={props.cluster.issueList}
              displayIssue={issue => (
                <Alert
                  isInline
                  variant={issue.severity === "ERROR" ? "danger" : "warning"}
                  title={
                    <span {...cluster.issue.message.mark}>{issue.message}</span>
                  }
                  {...cluster.issue.mark}
                />
              )}
            />
          </Content>
          <Content expandKey={COLUMNS.NODES} isEven={props.isEven}>
            <DashboardClusterNodes cluster={props.cluster} />
          </Content>
          <Content expandKey={COLUMNS.RESOURCES} isEven={props.isEven}>
            <DashboardClusterResources cluster={props.cluster} />
          </Content>
          <Content expandKey={COLUMNS.FENCE_DEVICES} isEven={props.isEven}>
            <DashboardClusterFenceDevices cluster={props.cluster} />
          </Content>
        </>
      }
    />
  );
};
