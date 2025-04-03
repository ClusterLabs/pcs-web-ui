import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionPayload} from "app/store/actions";

const initialState: {
  clusterName: string;
  resourceId: string;
  resourceType: ActionPayload["RESOURCE.DELETE.INIT"]["resourceType"];
  resultMessage: string;
  response: "" | "sending" | "ok" | "fail";
  isForceable: boolean;
} = {
  clusterName: "",
  resourceId: "",
  resourceType: "resource",
  response: "",
  resultMessage: "",
  isForceable: false,
};

export const resourceDelete: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.DELETE.INIT":
      return {
        ...state,
        resourceId: action.payload.resourceId,
        resourceType: action.payload.resourceType,
        clusterName: action.key.clusterName,
      };

    case "RESOURCE.DELETE":
      return {
        ...state,
        response: "sending",
        resultMessage: "",
      };

    case "RESOURCE.DELETE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };

    case "RESOURCE.DELETE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
        isForceable: action.payload.isForceable,
      };

    case "RESOURCE.DELETE.CLOSE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
