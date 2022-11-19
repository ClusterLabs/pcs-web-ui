import {Root} from "./types";
import {getClusterInfo} from "./cluster";

export const getImportedClusterList = (state: Root) =>
  state.dashboard.clusterNameList;

export const dashboardAreDataLoaded = (state: Root) =>
  state.dashboard.dataFetch === "SUCCESS";

export const getClusterInfoList = (clusterList: string[]) => (state: Root) =>
  clusterList.map(clusterName => getClusterInfo(clusterName)(state));
