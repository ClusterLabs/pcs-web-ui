import {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  nodeName: string;
  authProcessId: number | null;
  showValidationErrors: boolean;
  libCall: typeof initialLibCall;
  nodeCheck:
    | "not-started"
    | "auth-check-started"
    | "auth-check-failed"
    | "auth-in-progress"
    | "success";
  nodeCheckMessage: string;
  importCall: {
    status: "not-started" | "started" | "success" | "error";
    message: string;
  };
} = {
  nodeName: "",
  authProcessId: null,
  showValidationErrors: false,
  libCall: initialLibCall,
  nodeCheck: "not-started",
  nodeCheckMessage: "",
  importCall: {
    status: "not-started",
    message: "",
  },
};

export const importExistingCluster: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "DASHBOARD.CLUSTER.IMPORT.UPDATE_NODE":
      return {
        ...state,
        nodeName: action.payload.nodeName,
        authProcessId: null,
        nodeCheck: "not-started",
      };

    case "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH":
      return {
        ...state,
        nodeCheck: "auth-check-started",
        nodeCheckMessage: "",
      };

    case "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.OK":
      return {
        ...state,
        authProcessId: null,
        nodeCheck: "success",
        nodeCheckMessage: "",
      };

    case "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.NO_AUTH":
      return {
        ...state,
        authProcessId: action.payload.authProcessId,
        nodeCheck: "auth-in-progress",
        nodeCheckMessage: "",
      };

    case "DASHBOARD.CLUSTER.IMPORT.CHECK_AUTH.FAIL":
      return {
        ...state,
        nodeCheck: "auth-check-failed",
        nodeCheckMessage: action.payload.message,
      };

    case "DASHBOARD.CLUSTER.IMPORT.RUN":
      return {
        ...state,
        importCall: {
          status: "started",
          message: "",
        },
      };

    case "DASHBOARD.CLUSTER.IMPORT.RUN.ERROR":
      return {
        ...state,
        importCall: {
          status: "error",
          message: action.payload.message,
        },
      };

    case "DASHBOARD.CLUSTER.IMPORT.RUN.OK":
      return {
        ...state,
        importCall: {
          status: "success",
          message: "",
        },
      };

    case "DASHBOARD.CLUSTER.IMPORT.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {
        ...state,
        libCall: libCall(state.libCall, action),
      };
  }
};
