import { Reducer, combineReducers } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

const data: Reducer<types.clusterProperties.ClusterProperties, Action> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case "CLUSTER_PROPERTIES.LOAD.SUCCESS": {
      const { apiClusterProperties } = action.payload;
      return Object.keys(apiClusterProperties).map(
        n => apiClusterProperties[n],
      );
    }
    default:
      return state;
  }
};

const fetchState: Reducer<
  types.clusterProperties.ClusterPropertiesService["fetchState"],
  Action
> = (state = { current: "NOT_STARTED", alreadyLoaded: false }, action) => {
  switch (action.type) {
    case "CLUSTER_PROPERTIES.LOAD.SUCCESS":
      return {
        current: "LOADED",
        alreadyLoaded: true,
      };
    case "CLUSTER_PROPERTIES.LOAD":
      return {
        ...state,
        current: state.alreadyLoaded ? "RELOADING" : "LOADING",
      };
    case "CLUSTER_PROPERTIES.LOAD.FAILED":
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
