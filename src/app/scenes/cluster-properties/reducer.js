import * as types from "./constants";

const defaultState = {
  ui: {
    initialLoading: {
      status: "none", // none, process, error
      errorMsg: "",
    },
  },
  properties: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_CLUSTER_PROPERTIES: return {
      ...state,
      ui: {
        initialLoading: {
          status: "process",
          errorMsg: "",
        },
      },
    };
    case types.FETCH_CLUSTER_PROPERTIES_SUCCESS: return {
      ...action.payload,
      ui: {
        initialLoading: {
          status: "none",
          errorMsg: "",
        },
      },
    };
    case types.FETCH_CLUSTER_PROPERTIES_FAILED: return {
      ...state,
      ui: {
        initialLoading: {
          status: "error",
          errorMsg: action.payload,
        },
      },
    };
    default: return state;
  }
};

export const dataFetch = state => ({
  isSuccess: state.clusterProperties.ui.initialLoading.status === "none",
  isError: state.clusterProperties.ui.initialLoading.status === "error",
  errorMessage: state.clusterProperties.ui.initialLoading.errorMsg.message,
});

export const clusterProperties = state => state.clusterProperties.properties;
