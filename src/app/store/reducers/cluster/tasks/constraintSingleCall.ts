import {AppReducer} from "app/store/reducers/appReducer";

export const initialState: {
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
} = {
  response: "",
  resultMessage: "",
};

export const constraintSingleCall: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CONSTRAINT.SINGLE.CREATE":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "CONSTRAINT.SINGLE.CREATE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "CONSTRAINT.SINGLE.CREATE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
      };

    case "CONSTRAINT.SINGLE.CREATE.FAIL.RECOVER":
      return {
        ...state,
        response: "",
        resultMessage: "",
      };

    default:
      return state;
  }
};
