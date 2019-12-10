import React from "react";

import { types } from "app/store";
import { Table } from "app/view/common";
import { compareStatusSeverity, compareStrings } from "app/view/utils";

import DashboardCluster from "./DashboardCluster";


type COLUMNS = "NAME"|"ISSUES"|"NODES"|"RESOURCES"|"FENCE_DEVICES";

const compareByColumn = (
  column: COLUMNS|"",
): (
  (a: types.dashboard.ClusterState, b: types.dashboard.ClusterState) => number
) => {
  switch (column) {
    case "ISSUES": return (a, b) => compareStatusSeverity(
      a.summary.issuesSeverity,
      b.summary.issuesSeverity,
    );
    case "NODES": return (a, b) => compareStatusSeverity(
      a.summary.nodesSeverity,
      b.summary.nodesSeverity,
    );
    case "RESOURCES": return (a, b) => compareStatusSeverity(
      a.summary.resourcesSeverity,
      b.summary.resourcesSeverity,
    );
    case "FENCE_DEVICES": return (a, b) => compareStatusSeverity(
      a.summary.fenceDevicesSeverity,
      b.summary.fenceDevicesSeverity,
    );
    default: return (a, b) => compareStrings(a.name, b.name);
  }
};

const SortableTh = Table.SortableTh.bindColumns<COLUMNS>();

export default ({ dashboard }: {
  dashboard: types.dashboard.DashboardState
}) => {
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
