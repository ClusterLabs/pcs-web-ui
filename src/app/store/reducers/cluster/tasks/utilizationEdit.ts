import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

type Owner = ActionPayload["CLUSTER.UTILIZATION.EDIT"]["owner"];
type OperationType = ActionPayload["CLUSTER.UTILIZATION.EDIT"]["type"];

const initialState: {
  name: string;
  value: string;
  owner: Owner;
  type: OperationType | null;
  call: {
    response: "" | "sending" | "ok" | "fail";
    resultMessage: string;
  };
  showValidationErrors: boolean;
} = {
  name: "",
  value: "",
  owner: {
    type: "resource",
    id: "",
  },
  type: null,
  call: {
    response: "",
    resultMessage: "",
  },
  showValidationErrors: false,
};

export const utilizationEdit: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.UTILIZATION.EDIT":
      return {
        ...state,
        owner: action.payload.owner,
        type: action.payload.type,
        name: action.payload.type === "update" ? action.payload.name : "",
        value: action.payload.type === "update" ? action.payload.value : "",
      };

    case "CLUSTER.UTILIZATION.EDIT.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.UTILIZATION.SAVE":
      return {
        ...state,
        call: {
          response: "sending",
          resultMessage: "",
        },
      };

    case "CLUSTER.UTILIZATION.SAVE.OK":
      return {
        ...state,
        call: {
          response: "ok",
          resultMessage: "",
        },
      };

    case "CLUSTER.UTILIZATION.SAVE.ERROR":
      return {
        ...state,
        call: {
          response: "fail",
          resultMessage: action.payload.message,
        },
      };

    case "CLUSTER.UTILIZATION.SAVE.ERROR.RECOVER":
      return {
        ...state,
        call: {
          response: "",
          resultMessage: "",
        },
      };

    case "CLUSTER.UTILIZATION.EDIT.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
