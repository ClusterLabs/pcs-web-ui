import type {selectors} from "app/store";

export type ClusterInfo = ReturnType<
  ReturnType<typeof selectors.getClusterStoreInfoList>
>[number];

export type Cluster = Extract<
  ClusterInfo,
  {isFetched: true}
>["clusterStatus"]["data"];

export type Resource = Cluster["resourceTree"][number];
export type FenceDevice = Cluster["fenceDeviceList"][number];
export type Node = Cluster["nodeList"][number];
export type ConnectedNode = Exclude<Node, {status: "DATA_NOT_PROVIDED"}>;
