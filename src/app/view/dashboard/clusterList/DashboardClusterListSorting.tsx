import {Table, compareStatusSeverity} from "app/view/share";
import {selectors} from "app/store";

import {compareStrings} from "./utils";

type COLUMNS =
  | "NAME"
  | "ISSUES"
  | "NODES"
  | "RESOURCES"
  | "FENCE_DEVICES"
  | "ACTIONS";

type ClusterInfo = ReturnType<
  ReturnType<typeof selectors.getClusterStoreInfoList>
>[number];
type ClusterStatus = Extract<ClusterInfo, {isFetched: true}>["clusterStatus"];

const compareByState =
  (compare: (_clusterA: ClusterStatus, _clusterB: ClusterStatus) => number) =>
  (a: ClusterInfo, b: ClusterInfo) => {
    if (a.isFetched && b.isFetched) {
      return compare(a.clusterStatus, b.clusterStatus);
    }
    if (a.isFetched) {
      return 1;
    }
    if (b.isFetched) {
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

export const DashboardClusterListSorting = ({
  clusterInfoList,
  children,
}: {
  clusterInfoList: ClusterInfo[];
  children: (_clusterInfoList: ClusterInfo[]) => React.ReactNode;
}) => {
  const {sortState, compareItems} = SortableTh.useSorting<COLUMNS>("NAME");
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
      {children(clusterInfoList.sort(compareItems(compareByColumn)))}
    </Table>
  );
};
