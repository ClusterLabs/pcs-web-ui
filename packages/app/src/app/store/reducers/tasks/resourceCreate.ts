import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionPayload} from "app/store/actions";

import {initialState as initialLibCall, libCall} from "./libCall";

type InstanceAttrName = string;
type InstanceAttrValue = string;
type InstanceAttrs = Record<InstanceAttrName, InstanceAttrValue>;

const initialState: {
  clusterName: string;
  groupIdStructureList: ActionPayload["RESOURCE.CREATE.INIT"]["groupIdStructureList"];
  agentName: string;
  resourceName: string;
  instanceAttrs: InstanceAttrs;
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
  clone: boolean;
  promotable: boolean;
  disabled: boolean;
  useGroup: "no" | "existing" | "new";
  group: string;
} = {
  clusterName: "",
  groupIdStructureList: [],
  resourceName: "",
  agentName: "",
  libCall: initialLibCall,
  instanceAttrs: {},
  showValidationErrors: false,
  clone: false,
  promotable: false,
  disabled: false,
  useGroup: "no",
  group: "",
};

const instanceAttrs = (stateAttrs: InstanceAttrs, actionAttrs: InstanceAttrs) =>
  Object.keys(actionAttrs).reduce((attrs, name) => {
    if (actionAttrs[name].length > 0) {
      return {...attrs, [name]: actionAttrs[name]};
    }
    const {[name]: _, ...rest} = stateAttrs;
    return rest;
  }, stateAttrs);

export const resourceCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.CREATE.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        groupIdStructureList: action.payload.groupIdStructureList,
      };
    case "RESOURCE.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload,
        instanceAttrs: instanceAttrs(
          state.instanceAttrs,
          action.payload.instanceAttrs || {},
        ),
      };
    }

    case "RESOURCE.CREATE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
