import React from "react";
import { useSelector } from "react-redux";

import { selectors, types, utils } from "app/store";
import { Table } from "app/view";

import { compareStrings } from "./utils";
import { DashboardCluster } from "./DashboardCluster";
import { DashboardClusterLoading } from "./DashboardClusterLoading";

const { compareStatusSeverity } = utils;

type COLUMNS = "NAME" | "ISSUES" | "NODES" | "RESOURCES" | "FENCE_DEVICES";

const compareByColumn = (
  column: COLUMNS | "",
): ((
  a: types.cluster.ClusterStatus,
  b: types.cluster.ClusterStatus,
) => number) => {
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

export const DashboardClusterList: React.FC<{
  importedClusterNameList: types.dashboard.ClusterNameList;
}> = ({ importedClusterNameList }) => {
  const { sortState, compareItems } = SortableTh.useSorting<COLUMNS>("NAME");
  const clusterMap = useSelector(
    selectors.getClusterMap(importedClusterNameList),
  );
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
      {Object.keys(clusterMap)
        .map(name => clusterMap[name].cluster)
        .sort(compareItems(compareByColumn))
        .map(cluster =>
          clusterMap[cluster.name].isLoaded ? (
            <DashboardCluster key={cluster.name} cluster={cluster} />
          ) : (
            <DashboardClusterLoading
              key={cluster.name}
              clusterName={cluster.name}
            />
          ),
        )}
    </Table>
  );
};
