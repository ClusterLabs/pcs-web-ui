import { RootState } from "app/store/reducers/root";

export type Root = RootState;

type ClusterStorage = Root["clusterStorage"];
export type ClusterStorageItem = ClusterStorage[keyof ClusterStorage];
export type Cluster = ClusterStorageItem["clusterStatus"]["clusterData"];
