import * as types from "./constants";

const defaultState = {
  ui: {
    initialLoading: {
      status: "none", // none, process, error
      name: "",
      errorMsg: "",
    },
  },
  data: {
    name: "",
    nodeList: [],
    resourceList: [],
    stonithList: [],
  },
};

export default function dashboard(state = defaultState, action) {
  switch (action.type) {
    case types.SYNC_CLUSTER_DATA: return {
      ...defaultState,
      ui: {
        initialLoading: {
          status: "process",
          name: action.payload.clusterName,
          errorMsg: "",
        },
      },
    };
    case types.FETCH_CLUSTER_DATA_SUCCESS: return {
      ...state,
      data: action.payload,
      ui: {
        initialLoading: {
          status: "none",
          name: action.payload.name,
          errorMsg: "",
        },
      },
    };
    case types.FETCH_CLUSTER_DATA_FAILED: return (
      state.ui.initialLoading.status === "process"
        ? {
          ...state,
          ui: {
            initialLoading: {
              status: "error",
              name: state.ui.initialLoading.name,
              errorMsg: action.payload,
            },
          },
        }
        : state
    );
    default: return state;
  }
}
