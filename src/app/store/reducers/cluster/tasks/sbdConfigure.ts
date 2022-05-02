import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

const initialState: ActionPayload["CLUSTER.SBD.CONFIGURE"] & {
  libCall: typeof initalLibCall;
  showValidationErrors: boolean;
} = {
  watchdogDict: {},
  delayStart: "DEFAULT",
  startmode: "DEFAULT",
  watchdogTimeout: "",
  timeoutActionFlush: "DEFAULT",
  timeoutAction: "DEFAULT",
  libCall: initalLibCall,
  showValidationErrors: false,
};

export const sbdConfigure: AppReducer<typeof initialState> = (
  state = initialState,
  action,
): typeof initialState => {
  switch (action.type) {
    case "CLUSTER.SBD.CONFIGURE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.SBD.CONFIGURE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.SBD.CONFIGURE.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
