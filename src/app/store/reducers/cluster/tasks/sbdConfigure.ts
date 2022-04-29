import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

const initialState: ActionPayload["CLUSTER.SBD.CONFIGURE"] & {
  libCall: typeof initalLibCall;
} = {
  watchdogDict: {},
  delayStart: "DEFAULT",
  startmode: "DEFAULT",
  watchdogTimeout: "",
  timeoutActionFlush: "DEFAULT",
  timeoutAction: "DEFAULT",
  libCall: initalLibCall,
};

export const sbdConfigure: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
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

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
