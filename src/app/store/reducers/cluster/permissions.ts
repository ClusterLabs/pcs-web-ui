import {combineReducers} from "redux";

import {ActionPayload} from "app/store/actions";
import {AppReducer} from "app/store/reducers/appReducer";

type Payload = ActionPayload["CLUSTER.PERMISSIONS.LOAD.OK"];
type ClusterPermissions = Payload["apiClusterPermissions"];

type ClusterPermissionsService = {
  data: ClusterPermissions | null;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};

const data: AppReducer<ClusterPermissionsService["data"]> = (
  state = null,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PERMISSIONS.LOAD.OK": {
      return action.payload.apiClusterPermissions;
    }
    default:
      return state;
  }
};

const fetchState: AppReducer<ClusterPermissionsService["fetchState"]> = (
  state = {current: "NOT_STARTED", alreadyLoaded: false},
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PERMISSIONS.LOAD.OK":
      return {
        current: "LOADED",
        alreadyLoaded: true,
      };
    case "CLUSTER.PERMISSIONS.LOAD":
      return {
        ...state,
        current: state.alreadyLoaded ? "RELOADING" : "LOADING",
      };
    case "CLUSTER.PERMISSIONS.LOAD.ERROR":
      return {
        ...state,
        current: "FAILED",
      };
    default:
      return state;
  }
};

export const clusterPermissions = combineReducers({
  data,
  fetchState,
});
