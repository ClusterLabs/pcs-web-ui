import * as types from "./constants"

const defaultState = {
  clusterData: {
    name: "",
  }
};

export default function dashboard(state=defaultState, action) {
  switch(action.type){
    case types.FETCH_CLUSTER_DATA_SUCCESS: return {
      clusterData: action.payload,
    }
    default: return state
  }
}
