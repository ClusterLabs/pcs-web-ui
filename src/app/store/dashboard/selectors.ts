import { Selector } from "../types";

import { ClusterNameListState } from "./types";

export const getImportedClusterList: Selector<ClusterNameListState> = state =>
  state.dashboard.clusterNameListState;

export const areDataLoaded: Selector<boolean> = state =>
  state.dashboard.dataFetchState === "SUCCESS";
