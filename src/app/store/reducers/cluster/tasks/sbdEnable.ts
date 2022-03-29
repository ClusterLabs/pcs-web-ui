import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

type NodeName = string;

const initialState: {
  defaultWatchdog: string;
  watchdogDict: Record<NodeName, string>;
  delayStart: "yes" | "no" | "DEFAULT";
  startmode: "always" | "clean" | "DEFAULT";
  watchdogTimeout: string;
  libCall: typeof initalLibCall;
} = {
  defaultWatchdog: "/dev/watchdog",
  watchdogDict: {},
  delayStart: "DEFAULT",
  startmode: "DEFAULT",
  watchdogTimeout: "5",
  libCall: initalLibCall,
};

export const sbdEnable: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.SBD.ENABLE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.SBD.ENABLE.CLOSE":
      return initialState;

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
