import React from "react";

import { Table, StatusIco } from "app/components";
import { mapConstants, compareStrings } from "app/utils";

import DashboardCluster from "./DashboardCluster";
import { issuesToSummaryStatus } from "./DashboardIssueList";
import { nodesToSummaryStatus } from "./DashboardNodeList";
import { resourcesToSummaryStatus } from "./DashboardResourceList";
import { fenceDeviceToSummaryStatus } from "./DashboardFenceDeviceList";

const COLUMNS = {
  NAME: "NAME",
  ISSUES: "ISSUES",
  NODES: "NODES",
  RESOURCES: "RESOURCES",
  FENCE_DEVICES: "FENCE_DEVICES",
};

const severity = mapConstants(1, {
  [StatusIco.STATUS_MAP.ERROR]: 3,
  [StatusIco.STATUS_MAP.WARNING]: 2,
  [StatusIco.STATUS_MAP.OK]: 0,
});

const compareByColumn = (column) => {
  switch (column) {
    case COLUMNS.ISSUES: return (a, b) => (
      severity(issuesToSummaryStatus(a.issueList))
      - severity(issuesToSummaryStatus(b.issueList))
    );
    case COLUMNS.NODES: return (a, b) => (
      severity(nodesToSummaryStatus(a.nodeList))
      - severity(nodesToSummaryStatus(b.nodeList))
    );
    case COLUMNS.RESOURCES: return (a, b) => (
      severity(resourcesToSummaryStatus(a.resourceList))
      - severity(resourcesToSummaryStatus(b.resourceList))
    );
    case COLUMNS.FENCE_DEVICES: return (a, b) => (
      severity(fenceDeviceToSummaryStatus(a.fenceDeviceList))
      - severity(fenceDeviceToSummaryStatus(b.fenceDeviceList))
    );
    default: return (a, b) => compareStrings(a.name, b.name);
  }
};

export default ({ dashboard }) => {
  const {
    compareItems,
    SortableTh,
  } = Table.SortableTh.useSorting();
  return (
    <Table isExpandable data-role="cluster-list">
      <thead>
        <tr>
          <SortableTh columnName={COLUMNS.NAME}>Clusters</SortableTh>
          <SortableTh columnName={COLUMNS.ISSUES} startDesc>Issues</SortableTh>
          <SortableTh columnName={COLUMNS.NODES} startDesc>Nodes</SortableTh>
          <SortableTh columnName={COLUMNS.RESOURCES} startDesc>
            Resources
          </SortableTh>
          <SortableTh columnName={COLUMNS.FENCE_DEVICES} startDesc>
            Fence devices
          </SortableTh>
        </tr>
      </thead>
      {dashboard.clusterList
        .sort(compareItems(compareByColumn))
        .map(cluster => (
          <DashboardCluster key={cluster.name} cluster={cluster} />
        ))
      }
    </Table>
  );
};
