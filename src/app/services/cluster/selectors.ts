import { Selector, RootState, RootStateKey } from "app/core/types";

import {
  ClusterServiceState,
  ClusterState,
  FETCH_STATUS,
} from "./types";

const localState: Selector<RootState, ClusterServiceState> = (
  state => state[RootStateKey.Cluster]
);

export const areDataLoaded: Selector<RootState, boolean> = (
  state => localState(state).dataFetchState === FETCH_STATUS.SUCCESS
);

export const getCluster: Selector<RootState, ClusterState> = (
  state => localState(state).clusterState
);
