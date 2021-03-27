import { combineReducers } from "redux";

import { ActionPayload } from "app/store/actions";

import { Reducer } from "../tools";

type Payload = ActionPayload["CLUSTER.PROPERTIES.LOAD.OK"];
type ClusterProperties = Payload["apiClusterProperties"];

type ClusterPropertiesService = {
  data: ClusterProperties[keyof ClusterProperties][];
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

const data: Reducer<ClusterPropertiesService["data"]> = (
  state = [],
  action,
) => {
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

export const clusterProperties = combineReducers({
  data,
  fetchState,
});
