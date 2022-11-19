import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {Table, compareStatusSeverity} from "app/view/share";

import {compareStrings} from "./utils";
import {DashboardClusterListItem} from "./DashboardClusterListItem";

type COLUMNS =
  | "NAME"
  | "ISSUES"
  | "NODES"
  | "RESOURCES"
  | "FENCE_DEVICES"
  | "ACTIONS";

type ClusterInfo = ReturnType<
  ReturnType<typeof selectors.getClusterInfoList>
>[number];

type ClusterStatusData = Extract<
  ClusterInfo,
  {state: "cluster-data-successfully-fetched"}
>["cluster"];

const compareByState =
  (
    compare: (
      _clusterA: ClusterStatusData,
      _clusterB: ClusterStatusData,
    ) => number,
  ) =>
  (a: ClusterInfo, b: ClusterInfo) => {
    if (
      a.state === "cluster-data-successfully-fetched"
      && b.state === "cluster-data-successfully-fetched"
    ) {
      return compare(a.cluster, b.cluster);
    }
    if (a.state === "cluster-data-successfully-fetched") {
      return 1;
    }
    if (b.state === "cluster-data-successfully-fetched") {
      return -1;
    }
    return compareStrings(a.clusterName, b.clusterName);
  };

const compareByColumn = (
  column: COLUMNS | "",
): ((_a: ClusterInfo, _b: ClusterInfo) => number) => {
  switch (column) {
    case "ISSUES":
      return compareByState((a, b) =>
        compareStatusSeverity(
          a.summary.issuesSeverity,
          b.summary.issuesSeverity,
        ),
      );

    case "NODES":
      return compareByState((a, b) =>
        compareStatusSeverity(a.summary.nodesSeverity, b.summary.nodesSeverity),
      );

    case "RESOURCES":
      return compareByState((a, b) =>
        compareStatusSeverity(
          a.summary.resourcesSeverity,
          b.summary.resourcesSeverity,
        ),
      );

    case "FENCE_DEVICES":
      return compareByState((a, b) =>
        compareStatusSeverity(
          a.summary.fenceDevicesSeverity,
          b.summary.fenceDevicesSeverity,
        ),
      );

    default:
      return (a, b) => compareStrings(a.clusterName, b.clusterName);
  }
};

const {SortableTh} = Table;

export const DashboardClusterList = ({
  importedClusterNameList,
}: {
  importedClusterNameList: Parameters<typeof selectors.getClusterInfoList>[0];
}) => {
  const {sortState, compareItems} = SortableTh.useSorting<COLUMNS>("NAME");
  const clusterInfoList = useSelector(
    selectors.getClusterInfoList(importedClusterNameList),
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
          <th data-label=""></th>
        </tr>
      </thead>
      {clusterInfoList.sort(compareItems(compareByColumn)).map(clusterInfo => (
        <DashboardClusterListItem
          key={clusterInfo.clusterName}
          clusterInfo={clusterInfo}
        />
      ))}
    </Table>
  );
};
