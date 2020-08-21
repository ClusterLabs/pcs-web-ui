import { Reducer, combineReducers } from "app/store/redux";

export type ClusterNameListState = string[];

export interface DashboardPageState {
  clusterNameListState: ClusterNameListState;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS" | "ERROR";
}

const clusterNameListState: Reducer<DashboardPageState["clusterNameListState"]> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "DASHBOARD_DATA.FETCH.SUCCESS":
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
    case "DASHBOARD_DATA.SYNC":
      return state === "SUCCESS" ? "SUCCESS" : "IN_PROGRESS";
    case "DASHBOARD_DATA.FETCH.SUCCESS":
      return "SUCCESS";
    case "DASHBOARD_DATA.FETCH.FAILED":
      return state === "IN_PROGRESS" ? "ERROR" : state;
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
