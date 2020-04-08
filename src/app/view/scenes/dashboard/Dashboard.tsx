import React from "react";

import { types } from "app/store";
import { Table } from "app/view/common";

import { compareStatusSeverity, compareStrings } from "./utils";
import { DashboardCluster } from "./DashboardCluster";

type COLUMNS = "NAME" | "ISSUES" | "NODES" | "RESOURCES" | "FENCE_DEVICES";

const compareByColumn = (
  column: COLUMNS | "",
): ((
  a: types.dashboard.ClusterState,
  b: types.dashboard.ClusterState,
) => number
) => {
  switch (column) {
    case "ISSUES":
      return (a, b) =>
        compareStatusSeverity(
          a.summary.issuesSeverity,
          b.summary.issuesSeverity,
        );
    case "NODES":
      return (a, b) =>
        compareStatusSeverity(a.summary.nodesSeverity, b.summary.nodesSeverity);
    case "RESOURCES":
      return (a, b) =>
        compareStatusSeverity(
          a.summary.resourcesSeverity,
          b.summary.resourcesSeverity,
        );
    case "FENCE_DEVICES":
      return (a, b) =>
        compareStatusSeverity(
          a.summary.fenceDevicesSeverity,
          b.summary.fenceDevicesSeverity,
        );
    default:
      return (a, b) => compareStrings(a.name, b.name);
  }
};

const { SortableTh } = Table;

export const Dashboard = ({
  dashboard,
}: {
  dashboard: types.dashboard.DashboardState;
}) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");
  return (
    <Table isExpandable aria-label="Cluster list" data-test="cluster-list">
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState} data-label="name">
            Clusters
          </SortableTh>
          <SortableTh
            columnName="ISSUES"
            sortState={sortState}
            startDesc
            data-label="issues"
          >
            Issues
          </SortableTh>
          <SortableTh
            columnName="NODES"
            sortState={sortState}
            startDesc
            data-label="nodes"
          >
            Nodes
          </SortableTh>
          <SortableTh
            columnName="RESOURCES"
            sortState={sortState}
            startDesc
            data-label="resources"
          >
            Resources
          </SortableTh>
          <SortableTh
            columnName="FENCE_DEVICES"
            sortState={sortState}
            startDesc
            data-label="fence-devices"
          >
            Fence devices
          </SortableTh>
        </tr>
      </thead>
      {dashboard.clusterList
        .sort(compareItems(compareByColumn))
        .map(cluster => (
          <DashboardCluster key={cluster.name} cluster={cluster} />
        ))}
    </Table>
  );
};
