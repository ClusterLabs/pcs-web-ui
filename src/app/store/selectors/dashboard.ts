import { clusterStatusDefault } from "app/store/reducers";

import { Cluster, DashboardTaskKeys, Root } from "./types";
import { clusterAreDataLoaded, getCluster } from "./cluster";

type ClusterMap<T extends string> = Record<
  T,
  {
    cluster: Cluster;
    isLoaded: boolean;
  }
>;

export const getImportedClusterList = (state: Root) =>
  state.dashboard.clusterNameList;

export const dashboardAreDataLoaded = (state: Root) =>
  state.dashboard.dataFetch === "SUCCESS";

export const getClusterMap =
  <T extends string>(clusterList: T[]) =>
  (state: Root) =>
    clusterList.reduce<ClusterMap<T>>(
      (map, name) => ({
        ...map,
        [name]: {
          cluster: clusterAreDataLoaded(name)(state)
            ? getCluster(name)(state)
            : { ...clusterStatusDefault, name },
          isLoaded: clusterAreDataLoaded(name)(state),
        },
      }),
      {} as ClusterMap<T>,
    );

export const getDashboardTask =
  <NAME extends DashboardTaskKeys>(name: NAME) =>
  (state: Root) =>
    state.tasks[name];
