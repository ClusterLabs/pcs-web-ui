import { combineReducers } from "redux";

import { createDataFetchReducer, createDataFetchSelector }
  from "app/services/data-load/initial-fetch-reducer";

import * as types from "./constants";

const properties = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CLUSTER_PROPERTIES_SUCCESS:
      return action.payload.properties;
    default: return state;
  }
};

export default combineReducers({
  properties,
  dataFetch: createDataFetchReducer({
    START: types.FETCH_CLUSTER_PROPERTIES,
    SUCCESS: types.FETCH_CLUSTER_PROPERTIES_SUCCESS,
    FAIL: types.FETCH_CLUSTER_PROPERTIES_FAILED,
  }),
});

export const getClusterPropertiesDataFetch = createDataFetchSelector(state => (
  state.clusterProperties.dataFetch
));

export const getClusterProperties = state => state.clusterProperties.properties;
