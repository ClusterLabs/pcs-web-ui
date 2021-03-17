import { clusterStatusDefault, types } from "app/store/reducers";

import { Selector } from "./selector";
import { clusterAreDataLoaded, getCluster } from "./cluster";

type ClusterNameList = types.dashboard.ClusterNameList;

type ClusterInfo = {
  cluster: types.cluster.ClusterStatusService["clusterData"];
  isLoaded: boolean;
};

export const getImportedClusterList: Selector<ClusterNameList> = state =>
  state.dashboard.clusterNameList;

export const dashboardAreDataLoaded: Selector<boolean> = state =>
  state.dashboard.dataFetch === "SUCCESS";

export function getClusterMap<T extends string>(
  clusterList: T[],
): Selector<Record<T, ClusterInfo>> {
  return state =>
    clusterList.reduce<Record<T, ClusterInfo>>(
      (map, name) => ({
        ...map,
        [name]: {
          cluster: clusterAreDataLoaded(name)(state)
            ? getCluster(name)(state)
            : { ...clusterStatusDefault, name },
          isLoaded: clusterAreDataLoaded(name)(state),
        },
      }),
      {} as Record<T, ClusterInfo>,
    );
}
