import { types } from "app/backend";
import { Reducer } from "app/store/redux";

export type Report = types.libraryResponse.ApiResponse;
export type WizardResourceCreate = {
  agentName: string;
  resourceName: string;
  response: "no-response" | "success" | "forceable-fail" | "fail";
  reports: Report[];
};

const initialState: WizardResourceCreate = {
  resourceName: "",
  agentName: "",
  response: "no-response",
  reports: [],
};

const wizardResourceCreate: Reducer<WizardResourceCreate> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.PRIMITIVE.CREATE.SET_RESOURCE_NAME":
      return { ...state, resourceName: action.payload.resourceName };
    case "RESOURCE.PRIMITIVE.CREATE.SET_AGENT_NAME":
      return { ...state, agentName: action.payload.agentName };
    case "RESOURCE.PRIMITIVE.CREATE":
      return { ...state, response: "no-response" };
    case "RESOURCE.PRIMITIVE.CREATE.SUCCESS":
      return { ...state, response: "success", reports: action.payload.reports };
    case "RESOURCE.PRIMITIVE.CREATE.FAILED":
      return { ...state, response: "fail", reports: action.payload.reports };
    case "RESOURCE.PRIMITIVE.CREATE.CLOSE":
      return initialState;
    default:
      return state;
  }
};

export default wizardResourceCreate;
