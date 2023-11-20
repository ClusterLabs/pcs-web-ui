import {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  clusterName: string;
  authProcessId: number | null;
  fixing: boolean;
  authAttemptInProgress: boolean;
  errorMessage: string;
} = {
  clusterName: "",
  authProcessId: null,
  fixing: false,
  authAttemptInProgress: false,
  errorMessage: "",
};

export const fixAuth: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.FIX_AUTH.AUTH_STARTED":
      return {
        ...state,
        authProcessId: action.payload.authProcessId,
        clusterName: action.payload.clusterName,
      };

    case "CLUSTER.FIX_AUTH.OK":
      return {
        ...state,
        fixing: false,
        errorMessage: "",
      };

    case "CLUSTER.FIX_AUTH.FAIL":
      return {
        ...state,
        fixing: false,
        errorMessage: action.payload.message,
      };

    case "CLUSTER.FIX_AUTH.ERROR":
      return {
        ...state,
        fixing: false,
        errorMessage: action.payload.message,
      };

    case "CLUSTER.FIX_AUTH.CANCEL":
      return {
        ...state,
        authProcessId: null,
        fixing: true,
        errorMessage: "",
      };

    case "CLUSTER.FIX_AUTH.AUTH_DONE":
      return {
        ...state,
        authProcessId: null,
        fixing: true,
      };

    case "NODE.AUTH":
    case "NODE.AUTH.FAIL":
    case "NODE.AUTH.OK":
      return action.key.process === state.authProcessId
        ? {...state, authAttemptInProgress: action.type === "NODE.AUTH"}
        : state;

    default:
      return state;
  }
};
