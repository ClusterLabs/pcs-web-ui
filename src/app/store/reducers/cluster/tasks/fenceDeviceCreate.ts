import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

type InstanceAttrName = string;
type InstanceAttrValue = string;
type InstanceAttrs = Record<InstanceAttrName, InstanceAttrValue>;

const initialState: {
  agentName: string;
  fenceDeviceName: string;
  instanceAttrs: InstanceAttrs;
  libCall: typeof initalLibCall;
  showValidationErrors: boolean;
  disabled: boolean;
  useGroup: "no" | "existing" | "new";
  group: string;
} = {
  fenceDeviceName: "",
  agentName: "",
  libCall: initalLibCall,
  instanceAttrs: {},
  showValidationErrors: false,
  disabled: false,
  useGroup: "no",
  group: "",
};

const instanceAttrs = (stateAttrs: InstanceAttrs, actionAttrs: InstanceAttrs) =>
  Object.keys(actionAttrs).reduce((attrs, name) => {
    if (actionAttrs[name].length > 0) {
      return { ...attrs, [name]: actionAttrs[name] };
    }
    const { [name]: _, ...rest } = stateAttrs;
    return rest;
  }, stateAttrs);

export const fenceDeviceCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "FENCE_DEVICE.CREATE.UPDATE": {
      const removeInstanceAttrs =
        "instanceAttrs" in action.payload
        && action.payload.instanceAttrs
        && Object.keys(action.payload.instanceAttrs).length === 0;

      return {
        ...state,
        ...action.payload,
        instanceAttrs: removeInstanceAttrs
          ? {}
          : instanceAttrs(
              state.instanceAttrs,
              action.payload.instanceAttrs || {},
            ),
      };
    }

    case "FENCE_DEVICE.CREATE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
