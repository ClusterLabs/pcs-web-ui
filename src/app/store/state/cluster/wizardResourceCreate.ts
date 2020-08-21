import { Reducer } from "redux";

import { Action } from "app/store/actions";

export type WizardResourceCreate = {
  agentName: string;
  resourceName: string;
};

const initialState: WizardResourceCreate = {
  resourceName: "",
  agentName: "",
};

const wizardResourceCreate: Reducer<WizardResourceCreate, Action> = (
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
