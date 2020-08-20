import { Reducer } from "redux";

import { Action } from "app/store/actions";
import * as types from "app/store/types";

const initialState: types.wizardResourceCreate.WizardResourceCreate = {
  resourceName: "",
  agentName: "",
};

const wizardResourceCreate: Reducer<
  types.wizardResourceCreate.WizardResourceCreate,
  Action
> = (state = initialState, action) => {
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
