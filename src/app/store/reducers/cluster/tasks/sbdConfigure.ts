import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";

import { initialState as initalLibCall, libCall } from "./libCall";

type NodeName = string;
type SbdTimeoutAction = "reboot" | "off" | "crashdump";
type SbdTimeoutActionFlush = "flush" | "noflush";
type InitPayload = ActionPayload["CLUSTER.SBD.CONFIGURE"];

const initialState: {
  watchdogDict: Record<NodeName, string>;
  delayStart: "yes" | "no" | "DEFAULT";
  startmode: "always" | "clean" | "DEFAULT";
  watchdogTimeout: string;
  timeoutActionFlush: "DEFAULT" | "flush" | "noflush";
  timeoutAction: "DEFAULT" | "reboot" | "crashdump" | "off";
  timeoutActionResult:
    | SbdTimeoutAction
    | SbdTimeoutActionFlush
    | "crashdump,flush"
    | "crashdump,noflush"
    | "off,flush"
    | "off,noflush"
    | "reboot,flush"
    | "reboot,noflush"
    | "flush,crashdump"
    | "flush,off"
    | "flush,reboot"
    | "noflush,crashdump"
    | "noflush,off"
    | "noflush,reboot";
  libCall: typeof initalLibCall;
} = {
  watchdogDict: {},
  delayStart: "DEFAULT",
  startmode: "DEFAULT",
  watchdogTimeout: "",
  timeoutActionFlush: "DEFAULT",
  timeoutAction: "DEFAULT",
  timeoutActionResult: "flush,reboot",
  libCall: initalLibCall,
};

const initToState = (initPayload: InitPayload) => {
  const sbdConfig = initPayload.cluster.sbdConfig;
  const timeoutActionArray = sbdConfig?.SBD_TIMEOUT_ACTION?.split(",");

  let timeoutActionFlush = "DEFAULT";
  let timeoutAction = "DEFAULT";
  timeoutActionArray?.forEach((action) => {
    if (action === "flush" || action === "noflush") {
      timeoutActionFlush = action;
    } else if (
      action === "reboot"
      || action === "crashdump"
      || action === "off"
    ) {
      timeoutAction = action;
    }
  });

  return {
    ...initialState,
    watchdogDict: initPayload.cluster.sbdWatchdogs || {},
    delayStart: (sbdConfig?.SBD_DELAY_START === "yes"
    || sbdConfig?.SBD_DELAY_START === "no"
      ? sbdConfig?.SBD_DELAY_START
      : "DEFAULT") as typeof initialState.delayStart,
    startmode: (sbdConfig?.SBD_STARTMODE === "clean"
    || sbdConfig?.SBD_STARTMODE === "always"
      ? sbdConfig?.SBD_STARTMODE
      : "DEFAULT") as typeof initialState.startmode,
    watchdogTimeout:
      sbdConfig?.SBD_WATCHDOG_TIMEOUT as typeof initialState.watchdogTimeout,
    timeoutActionFlush:
      timeoutActionFlush as typeof initialState.timeoutActionFlush,
    timeoutAction: timeoutAction as typeof initialState.timeoutAction,
  };
};

export const sbdConfigure: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.SBD.CONFIGURE":
      return initToState(action.payload);

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
