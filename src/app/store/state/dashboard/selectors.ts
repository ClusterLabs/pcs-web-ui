import * as types from "app/store/types";
import { Selector } from "app/store/types";

import {
  clusterAreDataLoaded,
  clusterStatusDefault,
  getCluster,
} from "../cluster";

type ClusterNameListState = types.dashboard.ClusterNameListState;

type ClusterInfo = {
  cluster: types.cluster.ClusterStatusService["clusterData"];
  isLoaded: boolean;
};

export const getImportedClusterList: Selector<ClusterNameListState> = state =>
  state.dashboard.clusterNameListState;

export const dashboardAreDataLoaded: Selector<boolean> = state =>
  state.dashboard.dataFetchState === "SUCCESS";

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
            : { ...clusterStatusDefault, name, urlName: name },
          isLoaded: clusterAreDataLoaded(name)(state),
        },
      }),
      {} as Record<T, ClusterInfo>,
    );
}
