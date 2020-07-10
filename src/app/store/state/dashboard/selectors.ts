import * as types from "app/store/types";
import { Selector } from "app/store/types";

type ClusterNameListState = types.dashboard.ClusterNameListState;
export const getImportedClusterList: Selector<ClusterNameListState> = state =>
  state.dashboard.clusterNameListState;

export const dashboardAreDataLoaded: Selector<boolean> = state =>
  state.dashboard.dataFetchState === "SUCCESS";
