import { types } from "app/store";
import { Selector } from "app/store/types";

type ClusterNameListState = types.dashboard.ClusterNameListState;
export const getImportedClusterList: Selector<ClusterNameListState> = state =>
  state.dashboard.clusterNameListState;

export const areDataLoaded: Selector<boolean> = state =>
  state.dashboard.dataFetchState === "SUCCESS";
