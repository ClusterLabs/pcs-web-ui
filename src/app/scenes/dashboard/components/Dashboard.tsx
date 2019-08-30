import React from "react";

import { Table, StatusIco } from "app/common/components";
import { compareStrings } from "app/common/utils";
import { ClusterState } from "app/services/cluster/types";

import DashboardCluster from "./DashboardCluster";
import { issuesToSummaryStatus } from "./DashboardIssueList";
import { nodesToSummaryStatus } from "./DashboardNodeList";
import { resourcesToSummaryStatus } from "./DashboardResourceList";
import { fenceDeviceToSummaryStatus } from "./DashboardFenceDeviceList";
import { DashboardState } from "../types";

type COLUMNS = "NAME"|"ISSUES"|"NODES"|"RESOURCES"|"FENCE_DEVICES";

const severity = (
  statusIco: React.ComponentProps<typeof StatusIco>["status"],
): number => {
  switch (statusIco) {
    case "ERROR": return 3;
    case "WARNING": return 2;
    case "OK": return 0;
    default: return 1;
  }
};

const compareByColumn = (column: COLUMNS|"") => {
  switch (column) {
    case "ISSUES": return (a: ClusterState, b: ClusterState) => (
      severity(issuesToSummaryStatus(a.issueList))
      - severity(issuesToSummaryStatus(b.issueList))
    );
    case "NODES": return (a: ClusterState, b: ClusterState) => (
      severity(nodesToSummaryStatus(a.nodeList))
      - severity(nodesToSummaryStatus(b.nodeList))
    );
    case "RESOURCES": return (a: ClusterState, b: ClusterState) => (
      severity(resourcesToSummaryStatus(a.resourceList))
      - severity(resourcesToSummaryStatus(b.resourceList))
    );
    case "FENCE_DEVICES": return (a: ClusterState, b: ClusterState) => (
      severity(fenceDeviceToSummaryStatus(a.fenceDeviceList))
      - severity(fenceDeviceToSummaryStatus(b.fenceDeviceList))
    );
    default: return (
      a: ClusterState,
      b: ClusterState,
    ) => compareStrings(a.name, b.name);
  }
};

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

export default ({ dashboard }: { dashboard: DashboardState }) => {
  const { sortState, compareItems } = SortableTh.useSorting();
  return (
    <Table isExpandable data-role="cluster-list">
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Clusters
          </SortableTh>
          <SortableTh columnName="ISSUES" sortState={sortState} startDesc>
            Issues
          </SortableTh>
          <SortableTh columnName="NODES" sortState={sortState} startDesc>
            Nodes
          </SortableTh>
          <SortableTh columnName="RESOURCES" sortState={sortState} startDesc>
            Resources
          </SortableTh>
          <SortableTh
            columnName="FENCE_DEVICES"
            sortState={sortState}
            startDesc
          >
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
