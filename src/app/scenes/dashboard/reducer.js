import * as types from "./constants";

const defaultState = {
  fetch: {
    result: undefined,
  },
  dashboardData: {
    clusterList: [],
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_DATA: return {
      ...state,
      fetch: { result: undefined },
    };
    case types.FETCH_DASHBOARD_DATA_SUCCESS: return {
      fetch: { result: true },
      dashboardData: action.payload,
    };
    case types.FETCH_DASHBOARD_DATA_FAILED:
      return {
        ...state,
        fetch: { result: action.payload },
      };
    default: return state;
  }
};

export const dashboard = state => state.dashboard.dashboardData;
export const dataFetch = state => ({
  isSuccess: state.dashboard.fetch.result !== undefined,
  isError: typeof state.dashboard.fetch.result === "object",
  errorMessage: state.dashboard.fetch.result,
});
