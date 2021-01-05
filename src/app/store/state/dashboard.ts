import { Reducer, combineReducers } from "app/store/redux";

export type ClusterNameList = string[];

export interface Dashboard {
  clusterNameList: ClusterNameList;
  dataFetch: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS";
}

const clusterNameList: Reducer<Dashboard["clusterNameList"]> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "CLUSTER.LIST.FETCH.OK":
      return action.payload.clusterNameList;
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

const dataFetch: Reducer<Dashboard["dataFetch"]> = (
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

export default combineReducers<Dashboard>({
  clusterNameList,
  dataFetch,
});
