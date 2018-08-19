import * as types from "./constants"

const defaultState = {
  clusterName: "",
  properties: []
};

export default function dashboard(state=defaultState, action) {
  switch(action.type){
    case types.FETCH_CLUSTER_PROPERTIES_SUCCESS: return action.payload
    default: return state
  }
}
