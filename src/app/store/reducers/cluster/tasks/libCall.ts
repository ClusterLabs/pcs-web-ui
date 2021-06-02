import { LibReport } from "app/store/types";
import { AppReducer } from "app/store/reducers/appReducer";

export const initialState: {
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error"
    | "progress";
  reports: LibReport[];
  forceFlags: string[];
} = {
  response: "no-response",
  reports: [],
  forceFlags: [],
};

export const libCall: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "LIB.CALL.CLUSTER.TASK":
      return {
        ...state,
        response: "progress",
      };

    case "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET":
      return {
        ...state,
        response: "no-response",
      };

    case "LIB.CALL.CLUSTER.TASK.OK":
      return {
        ...state,
        response: "success",
        reports: action.payload.reports,
      };

    case "LIB.CALL.CLUSTER.TASK.FAIL":
      return { ...state, response: "fail", reports: action.payload.reports };

    case "LIB.CALL.CLUSTER.TASK.ERROR":
      return { ...state, response: "communication-error" };

    case "LIB.CALL.CLUSTER.FORCE-FLAGS.ADD":
      return {
        ...state,
        forceFlags: [
          ...new Set([...state.forceFlags, ...action.payload.forceFlags]),
        ],
      };

    default:
      return state;
  }
};
