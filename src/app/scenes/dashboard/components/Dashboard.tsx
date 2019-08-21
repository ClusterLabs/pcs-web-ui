import React from "react";

import { Table, StatusIco } from "app/components";
import { compareStrings } from "app/utils";
import { ClusterState } from "app/services/cluster/types";

import DashboardCluster from "./DashboardCluster";
import { issuesToSummaryStatus } from "./DashboardIssueList";
import { nodesToSummaryStatus } from "./DashboardNodeList";
import { resourcesToSummaryStatus } from "./DashboardResourceList";
import { fenceDeviceToSummaryStatus } from "./DashboardFenceDeviceList";
import { DashboardState } from "../types";

enum COLUMNS {
  NAME = "NAME",
  ISSUES = "ISSUES",
  NODES = "NODES",
  RESOURCES = "RESOURCES",
  FENCE_DEVICES = "FENCE_DEVICES",
}

const severity = (statusIco: StatusIco.STATUS_MAP) => {
  switch (statusIco) {
    case StatusIco.STATUS_MAP.ERROR: return 3;
    case StatusIco.STATUS_MAP.WARNING: return 2;
    case StatusIco.STATUS_MAP.OK: return 0;
    default: return 1;
  }
};

const compareByColumn = (column: COLUMNS) => {
  switch (column) {
    case COLUMNS.ISSUES: return (a: ClusterState, b: ClusterState) => (
      severity(issuesToSummaryStatus(a.issueList))
      - severity(issuesToSummaryStatus(b.issueList))
    );
    case COLUMNS.NODES: return (a: ClusterState, b: ClusterState) => (
      severity(nodesToSummaryStatus(a.nodeList))
      - severity(nodesToSummaryStatus(b.nodeList))
    );
    case COLUMNS.RESOURCES: return (a: ClusterState, b: ClusterState) => (
      severity(resourcesToSummaryStatus(a.resourceList))
      - severity(resourcesToSummaryStatus(b.resourceList))
    );
    case COLUMNS.FENCE_DEVICES: return (a: ClusterState, b: ClusterState) => (
      severity(fenceDeviceToSummaryStatus(a.fenceDeviceList))
      - severity(fenceDeviceToSummaryStatus(b.fenceDeviceList))
    );
    default: return (
      a: ClusterState,
      b: ClusterState,
    ) => compareStrings(a.name, b.name);
  }
};

export default ({ dashboard }: { dashboard: DashboardState }) => {
  const { sortState, compareItems } = Table.SortableTh.useSorting();

  return (
    <Table isExpandable data-role="cluster-list">
      <thead>
        <tr>
          <Table.SortableTh columnName={COLUMNS.NAME} sortState={sortState}>
            Clusters
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.ISSUES}
            sortState={sortState}
            startDesc
          >
            Issues
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.NODES}
            sortState={sortState}
            startDesc
          >
            Nodes
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.RESOURCES}
            sortState={sortState}
            startDesc
          >
            Resources
          </Table.SortableTh>
          <Table.SortableTh
            columnName={COLUMNS.FENCE_DEVICES}
            sortState={sortState}
            startDesc
          >
            Fence devices
          </Table.SortableTh>
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
