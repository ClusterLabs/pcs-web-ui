import { types } from "app/backend";
import { Reducer } from "app/store/redux";

type InstanceAttrName = string;
type InstanceAttrValue = string;

export type Report = types.libraryResponse.ApiReport;
export type WizardResourceCreate = {
  agentName: string;
  resourceName: string;
  instanceAttrs: Record<InstanceAttrName, InstanceAttrValue>;
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
  reports: Report[];
  showValidationErrors: boolean;
};

const initialState: WizardResourceCreate = {
  resourceName: "",
  agentName: "",
  response: "no-response",
  instanceAttrs: {},
  reports: [],
  showValidationErrors: false,
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
    case "RESOURCE.PRIMITIVE.CREATE.ERROR":
      return { ...state, response: "communication-error" };
    case "RESOURCE.PRIMITIVE.CREATE.CLOSE":
      return initialState;
    case "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };
    case "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };
    case "RESOURCE.PRIMITIVE.CREATE.SET_INSTANCE_ATTRIBUTE":
      if (action.payload.value.length === 0) {
        const { [action.payload.name]: _, ...rest } = state.instanceAttrs;
        return { ...state, instanceAttrs: rest };
      }
      return {
        ...state,
        instanceAttrs: {
          ...state.instanceAttrs,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default wizardResourceCreate;
