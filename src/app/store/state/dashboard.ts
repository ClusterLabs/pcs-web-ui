import { Reducer, combineReducers } from "app/store/redux";

export type ClusterNameListState = string[];

export interface DashboardPageState {
  clusterNameListState: ClusterNameListState;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS";
}

const clusterNameListState: Reducer<
  DashboardPageState["clusterNameListState"]
> = (state = [], action) => {
  switch (action.type) {
    case "CLUSTER.LIST.FETCH.OK":
      return action.payload.clusterNameList;
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

const dataFetchState: Reducer<DashboardPageState["dataFetchState"]> = (
  state = "NOT_STARTED",
  action,
) => {
  switch (action.type) {
    case "CLUSTER.LIST.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "CLUSTER.LIST.FETCH.OK":
      return "SUCCESS";
    case "AUTH.REQUIRED":
      return "NOT_STARTED";
    default:
      return state;
  }
};

export default combineReducers<DashboardPageState>({
  clusterNameListState,
  dataFetchState,
});
