import type {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  resultMessage: string;
  clusterName: string;
  response: "" | "sending" | "ok" | "fail";
  isForceable: boolean;
} = {clusterName: "", response: "", resultMessage: "", isForceable: false};

export const clusterStop: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.STOP.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
      };

    case "CLUSTER.STOP":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "CLUSTER.STOP.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "CLUSTER.STOP.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
        isForceable: action.payload.isForceable,
      };

    case "CLUSTER.STOP.CLOSE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
