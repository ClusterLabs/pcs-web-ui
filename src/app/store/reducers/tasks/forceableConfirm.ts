import {AppReducer} from "app/store/reducers/appReducer";

type State = {
  resultMessage: string;
} & (
  | {
      response: "" | "sending" | "ok";
    }
  | {
      response: "fail";
      isForceable: boolean;
    }
);

const initialState: State = {
  response: "",
  resultMessage: "",
};

export const forceableConfirm: AppReducer<State> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "TASK.FORCEABLE-CONFIRM":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "TASK.FORCEABLE-CONFIRM.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "TASK.FORCEABLE-CONFIRM.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
        isForceable: action.payload.isForceable,
      };

    case "TASK.FORCEABLE-CONFIRM.CLOSE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
