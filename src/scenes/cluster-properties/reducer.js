import * as types from "./constants"

const defaultState = {
  ui: {
    initialLoading: {
      status: "none", // none, process, error
      errorMsg: "",
    }
  },
  properties: [],
};

export default function dashboard(state=defaultState, action) {
  switch(action.type){
    case types.FETCH_CLUSTER_PROPERTIES: return {
      ...state,
      ui: {
        initialLoading: {
          status: "process",
          errorMsg: ""
        }
      }
    }
    case types.FETCH_CLUSTER_PROPERTIES_SUCCESS: return {
      ...action.payload,
      ui: {
        initialLoading: {
          status: "none",
          errorMsg: ""
        }
      }
    }
    case types.FETCH_CLUSTER_PROPERTIES_FAILED: return {
      ...state,
      ui: {
        initialLoading: {
          status: "error",
          errorMsg: action.payload
        }
      }
    }
    default: return state
  }
}
