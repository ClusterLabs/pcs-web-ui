import {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  resultMessage: string;
  nodeName: string;
  response: "" | "sending" | "ok" | "fail";
  isForceable: boolean;
} = {nodeName: "", response: "", resultMessage: "", isForceable: false};

export const nodeStop: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.STOP.INIT":
      return {
        ...state,
        nodeName: action.payload.nodeName,
      };

    case "NODE.STOP":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "NODE.STOP.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "NODE.STOP.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
        isForceable: action.payload.isForceable,
      };

    case "NODE.STOP.CLOSE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
