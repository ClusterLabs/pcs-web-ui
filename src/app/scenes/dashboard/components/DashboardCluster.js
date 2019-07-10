import React from "react";
import { Link } from "react-router-dom";
import { Table, StatusIco } from "app/components";

import DashboardNodeList, { nodesToSummaryStatus }
  from "./DashboardNodeList";
import DashboardResourceList, { resourcesToSummaryStatus }
  from "./DashboardResourceList";
import DashboardFenceDeviceList, { fenceDeviceToSummaryStatus }
  from "./DashboardFenceDeviceList";
import DashboardIssueList, { issuesToSummaryStatus }
  from "./DashboardIssueList";

const COLUMNS = {
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
};
const EXPANDABLE_COLUMNS = Object.keys(COLUMNS);
const CELL_COUNT = 1 + EXPANDABLE_COLUMNS.length;

const Summary = ({ itemsCount, summaryStatus }) => {
  if (summaryStatus === StatusIco.STATUS_MAP.OK) {
    return itemsCount;
  }
  return (
    <React.Fragment>
      <div>{itemsCount}</div>
      <div><StatusIco status={summaryStatus} /></div>
    </React.Fragment>
  );
};

const DashboardCluster = ({ cluster }) => {
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
            summaryStatus={issuesToSummaryStatus(cluster.issueList)}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.NODES} data-role="nodes-total">
          <Summary
            itemsCount={cluster.nodeList.length}
            summaryStatus={nodesToSummaryStatus(cluster.nodeList)}
          />
        </Toggle>
        <Toggle expandKey={COLUMNS.RESOURCES} data-role="resources-total">
          <Summary
            itemsCount={cluster.resourceList.length}
            summaryStatus={resourcesToSummaryStatus(cluster.resourceList)}
          />
        </Toggle>
        <Toggle
          expandKey={COLUMNS.FENCE_DEVICES}
          data-role="fence-devices-total"
        >
          <Summary
            itemsCount={cluster.stonithList.length}
            summaryStatus={fenceDeviceToSummaryStatus(cluster.stonithList)}
          />
        </Toggle>
      </tr>
      <Content expandKey={COLUMNS.ISSUES}>
        <DashboardIssueList issueList={cluster.issueList} />
      </Content>
      <Content expandKey={COLUMNS.NODES}>
        <DashboardNodeList nodeList={cluster.nodeList} />
      </Content>
      <Content expandKey={COLUMNS.RESOURCES}>
        <DashboardResourceList resourceList={cluster.resourceList} />
      </Content>
      <Content expandKey={COLUMNS.FENCE_DEVICES}>
        <DashboardFenceDeviceList fenceDeviceList={cluster.stonithList} />
      </Content>
    </Table.Body>
  );
};

export default DashboardCluster;
