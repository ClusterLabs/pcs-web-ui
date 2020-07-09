import { Reducer, combineReducers } from "redux";

import { Action } from "app/actions";

import { types } from "app/store";

import { clusterStatus } from "./clusterStatus/reducer";

const cluster = combineReducers<types.cluster.AppClusterState>({
  clusterStatus,
});

const clusterStorage: Reducer<types.cluster.ClusterStorage, Action> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case "CLUSTER_DATA.SYNC":
    case "CLUSTER_DATA.FETCH.SUCCESS":
    case "CLUSTER_DATA.FETCH.FAILED":
      /* eslint-disable no-case-declarations */
      const name = action.payload.clusterUrlName;
      return {
        ...state,
        [name]: cluster(state[name], action),
      };
    case "AUTH.REQUIRED":
      return {};
    default:
      return state;
  }
};

export default clusterStorage;
