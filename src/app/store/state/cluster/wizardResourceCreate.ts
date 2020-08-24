import { Reducer } from "app/store/redux";

export type WizardResourceCreate = {
  agentName: string;
  resourceName: string;
  response: "no-response" | "success" | "fail";
};

const initialState: WizardResourceCreate = {
  resourceName: "",
  agentName: "",
  response: "no-response",
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
    case "RESOURCE.PRIMITIVE.CREATE.SUCCESS":
      return { ...state, response: "success" };
    case "RESOURCE.PRIMITIVE.CREATE.CLOSE":
      return initialState;
    default:
      return state;
  }
};

export default wizardResourceCreate;
