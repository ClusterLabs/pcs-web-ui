import * as types from "./constants"

// nodeData -> name, port, autoOn
export const addNode = ({clusterName, nodeData}) => ({
  type: types.ADD_NODE,
  payload: {clusterName, nodeData},
});

export const authRequired = () => ({
  type: types.AUTH_REQUIRED,
});

export const stopReuireAuthDataChanged = () => ({
  type: types.STOP_REQUIRE_AUTH_DATA_CHANGED,
});
