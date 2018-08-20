import * as types from "./constants"

const defaultState = {
  loaded: false,
  dashboardData: {
    clusterList: [],
  }
};

export default function dashboard(state=defaultState, action) {
  switch(action.type){
    case types.FETCH_DASHBOARD_DATA_SUCCESS: return {
      loaded: true,
      dashboardData: action.payload,
    }
    default: return state
  }
}
