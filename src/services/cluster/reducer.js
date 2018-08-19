import * as types from "./constants"

const defaultState = {
  name: "",
  nodeList: [],
  resourceList: [],
  stonithList: [],
};

export default function dashboard(state=defaultState, action) {
  switch(action.type){
    case types.FETCH_CLUSTER_DATA_SUCCESS: return action.payload
    default: return state
  }
}
