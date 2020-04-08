import React from "react";

import { types } from "app/store";
import { IssueList, Link, StatusIco, Table } from "app/view/common";

import { DashboardNodeList } from "./DashboardNodeList";
import { DashboardResourceList } from "./DashboardResourceList";
import { DashboardFenceDeviceList } from "./DashboardFenceDeviceList";

const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

const Summary = ({
  itemsCount,
  summaryStatus,
}: {
  itemsCount: number;
  summaryStatus: React.ComponentProps<typeof StatusIco>["status"];
}) => {
  if (summaryStatus === "OK") {
    return <>{itemsCount}</>;
  }
  return (
    <>
      <span className="pf-u-pr-lg">{itemsCount}</span>
      <StatusIco status={summaryStatus} />
    </>
  );
};

export const DashboardCluster = ({
  cluster,
}: {
  cluster: types.dashboard.ClusterState;
}) => {
  const { expanded, Toggle, Content } = Table.Expansion.useExpansion({
    contentSpan: CELL_COUNT,
  });

  return (
    <Table.Body
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      data-test={`cluster ${cluster.name}`}
    >
      <tr role="row">
        <th role="rowheader" data-test="name">
          <Link
            id={`dashboard-cluster-${cluster.name}`}
            to={`/cluster/${cluster.urlName}`}
          >
            {cluster.name}
          </Link>
        </th>
        <Toggle expandKey={COLUMNS.ISSUES} data-test="issues">
          <Summary
            itemsCount={cluster.issueList.length}
            summaryStatus={cluster.summary.issuesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.NODES} data-test="nodes">
          <Summary
            itemsCount={cluster.nodeList.length}
            summaryStatus={cluster.summary.nodesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.RESOURCES} data-test="resources">
          <Summary
            itemsCount={cluster.resourceTree.length}
            summaryStatus={cluster.summary.resourcesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.FENCE_DEVICES} data-test="fence-devices">
          <Summary
            itemsCount={cluster.fenceDeviceList.length}
            summaryStatus={cluster.summary.fenceDevicesSeverity}
          />
        </Toggle>
      </tr>
      <Content expandKey={COLUMNS.ISSUES}>
        <IssueList margin issueList={cluster.issueList} />
      </Content>
      <Content expandKey={COLUMNS.NODES}>
        <DashboardNodeList cluster={cluster} />
      </Content>
      <Content expandKey={COLUMNS.RESOURCES}>
        <DashboardResourceList cluster={cluster} />
      </Content>
      <Content expandKey={COLUMNS.FENCE_DEVICES}>
        <DashboardFenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />
      </Content>
    </Table.Body>
  );
};
