import {useLoadedCluster} from "app/view/cluster/share";

export type Cluster = ReturnType<typeof useLoadedCluster>;

export type Node = Cluster["nodeList"][number];
export type ConnectedNode = Exclude<Node, {status: "DATA_NOT_PROVIDED"}>;
export type NodeServiceMap = ConnectedNode["services"];
export type NodeService = NodeServiceMap[keyof NodeServiceMap];

export type Resource = Cluster["resourceTree"][number];
export type Primitive = Extract<Resource, {itemType: "primitive"}>;
export type Group = Extract<Resource, {itemType: "group"}>;
export type Clone = Extract<Resource, {itemType: "clone"}>;
export type ResourceStatus = Resource["status"];

export type ResourceOnNodeStatus = Cluster["resourceOnNodeStatusList"][number];

export type FenceDevice = Cluster["fenceDeviceList"][number];

export type StatusSeverity = ConnectedNode["statusSeverity"];
export type Issue = Cluster["issueList"][number];

export type NVPair = Resource["metaAttributes"][number];
