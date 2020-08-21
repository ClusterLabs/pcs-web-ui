import { Reducer } from "app/store/redux";

export type WizardResourceCreate = {
  agentName: string;
  resourceName: string;
};

const initialState: WizardResourceCreate = {
  resourceName: "",
  agentName: "",
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
    default:
      return state;
  }
};

export default wizardResourceCreate;
