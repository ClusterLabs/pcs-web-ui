import { combineReducers } from "redux";

import { ActionPayload } from "app/store/actions";

import { Reducer } from "../tools";

type CPs = ActionPayload["CLUSTER.PROPERTIES.LOAD.OK"]["apiClusterProperties"];
export type ClusterProperty = CPs[keyof CPs];

export type ClusterPropertiesService = {
  data: ClusterProperty[];
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

const data: Reducer<ClusterProperty[]> = (state = [], action) => {
  switch (action.type) {
    case "CLUSTER.PROPERTIES.LOAD.OK": {
      const { apiClusterProperties } = action.payload;
      return Object.keys(apiClusterProperties).map(
        n => apiClusterProperties[n],
      );
    }
    default:
      return state;
  }
};

const fetchState: Reducer<ClusterPropertiesService["fetchState"]> = (
  state = { current: "NOT_STARTED", alreadyLoaded: false },
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PROPERTIES.LOAD.OK":
      return {
        current: "LOADED",
        alreadyLoaded: true,
      };
    case "CLUSTER.PROPERTIES.LOAD":
      return {
        ...state,
        current: state.alreadyLoaded ? "RELOADING" : "LOADING",
      };
    case "CLUSTER.PROPERTIES.LOAD.ERROR":
      return {
        ...state,
        current: "FAILED",
      };
    default:
      return state;
  }
};

export default combineReducers({
  data,
  fetchState,
});
