import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

type Owner = ActionPayload["CLUSTER.NVPAIRS.EDIT"]["owner"];
type OperationType = ActionPayload["CLUSTER.NVPAIRS.EDIT"]["type"];

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
    type: "resource-utilization",
    id: "",
  },
  type: null,
  call: {
    response: "",
    resultMessage: "",
  },
  showValidationErrors: false,
};

export const nvpairEdit: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.NVPAIRS.EDIT":
      return {
        ...state,
        owner: action.payload.owner,
        type: action.payload.type,
        name: action.payload.type === "update" ? action.payload.name : "",
        value: action.payload.type === "update" ? action.payload.value : "",
      };

    case "CLUSTER.NVPAIRS.EDIT.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.NVPAIRS.SAVE":
      return {
        ...state,
        call: {
          response: "sending",
          resultMessage: "",
        },
      };

    case "CLUSTER.NVPAIRS.SAVE.OK":
      return {
        ...state,
        call: {
          response: "ok",
          resultMessage: "",
        },
      };

    case "CLUSTER.NVPAIRS.SAVE.ERROR":
      return {
        ...state,
        call: {
          response: "fail",
          resultMessage: action.payload.message,
        },
      };

    case "CLUSTER.NVPAIRS.SAVE.ERROR.RECOVER":
      return {
        ...state,
        call: {
          response: "",
          resultMessage: "",
        },
      };

    case "CLUSTER.NVPAIRS.EDIT.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return state;
  }
};
