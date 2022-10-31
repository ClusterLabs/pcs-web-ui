import { AppReducer } from "app/store/reducers/appReducer";

const initialState: {
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
} = {
  response: "",
  resultMessage: "",
};

export const forceableConfirm: AppReducer<typeof initialState> = (
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
      };

    case "TASK.FORCEABLE-CONFIRM.CLOSE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
