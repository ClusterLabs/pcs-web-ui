import { root } from "app/store/reducers/root";
import { ReturnTypeWithoutCombinedState } from "app/store/reducers/tools";

export type Root = ReturnTypeWithoutCombinedState<ReturnType<typeof root>>;

type ClusterStorage = Root["clusterStorage"];
export type ClusterStorageItem = ClusterStorage[keyof ClusterStorage];
export type Cluster = ClusterStorageItem["clusterStatus"]["clusterData"];
