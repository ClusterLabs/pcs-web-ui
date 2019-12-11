import React from "react";
import { Link } from "react-router-dom";

import { types } from "app/store";
import { Table, StatusIco, IssueList } from "app/view/common";

import DashboardNodeList from "./DashboardNodeList";
import DashboardResourceList from "./DashboardResourceList";
import DashboardFenceDeviceList from "./DashboardFenceDeviceList";


const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

const Summary = ({ itemsCount, summaryStatus }: {
  itemsCount: number,
  summaryStatus: React.ComponentProps<typeof StatusIco>["status"],
}) => {
  if (summaryStatus === "OK") {
    return <>{itemsCount}</>;
  }
  return (
    <>
      <div>{itemsCount}</div>
      <div><StatusIco status={summaryStatus} /></div>
    </>
  );
};

const DashboardCluster = ({ cluster }: {
  cluster: types.dashboard.ClusterState,
}) => {
  const { expanded, Toggle, Content } = Table.Expansion.useExpansion({
    contentSpan: CELL_COUNT,
  });

  return (
    <Table.Body
      isExpanded={EXPANDABLE_COLUMNS.includes(expanded)}
      data-role="cluster"
      data-role-key={cluster.name}
    >
      <tr>
        <th>
          <Link
            id={`dashboard-cluster-${cluster.name}`}
            data-role="detail-link"
            to={`/cluster/${cluster.urlName}`}
          >
            {cluster.name}
          </Link>
        </th>
        <Toggle expandKey={COLUMNS.ISSUES} data-role="issues-total">
          <Summary
            itemsCount={cluster.issueList.length}
            summaryStatus={cluster.summary.issuesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.NODES} data-role="nodes-total">
          <Summary
            itemsCount={cluster.nodeList.length}
            summaryStatus={cluster.summary.nodesSeverity}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.RESOURCES} data-role="resources-total">
          <Summary
            itemsCount={cluster.resourceTree.length}
            summaryStatus={cluster.summary.resourcesSeverity}
          />
        </Toggle>
        <Toggle
          expandKey={COLUMNS.FENCE_DEVICES}
          data-role="fence-devices-total"
        >
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
        <DashboardNodeList nodeList={cluster.nodeList} />
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

export default DashboardCluster;
