import { Reducer } from "../tools";

type Action = "start" | "promote" | "demote" | "stop";

const initialState: {
  firstResourceId: string;
  firstAction: Action;
  thenResourceId: string;
  thenAction: Action;
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
} = {
  firstResourceId: "",
  firstAction: "start",
  thenResourceId: "",
  thenAction: "start",
  response: "",
  resultMessage: "",
};

export const taskConstraintOrderCreate: Reducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.ORDER.CREATE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CONSTRAINT.ORDER.CREATE":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "CONSTRAINT.ORDER.CREATE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "CONSTRAINT.ORDER.CREATE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
      };

    case "CONSTRAINT.ORDER.CREATE.FAIL.RECOVER":
      return {
        ...state,
        response: "",
        resultMessage: "",
      };

    case "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES":
      return {
        ...state,
        firstResourceId: state.thenResourceId,
        firstAction: state.thenAction,
        thenResourceId: state.firstResourceId,
        thenAction: state.firstAction,
      };

    case "CONSTRAINT.ORDER.CREATE.CLOSE":
      return initialState;

    default:
      return state;
  }
};
