import type {AppReducer} from "app/store/reducers/appReducer";

import {initialState as initialLibCall, libCall} from "./libCall";

const initialState: {
  clusterName: string;
  isSbdEnabled: boolean;
  nodeName: string;
  nodeAddresses: {
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address5: string;
    address6: string;
    address7: string;
    address8: string;
  };
  nodeCheck:
    | "not-started"
    | "can-add-started"
    | "can-add-cannot"
    | "can-add-failed"
    | "auth-check-started"
    | "auth-check-failed"
    | "auth-in-progress"
    | "send-known-hosts-started"
    | "send-known-hosts-fail"
    | "success";
  nodeCheckMessage: string;
  libCall: typeof initialLibCall;
  showValidationErrors: boolean;
  sbdWatchdog: string;
  sbdDevices: [string, string, string];
  sbdNoWatchdogValidation: boolean;
  authProcessId: number | null;
} = {
  clusterName: "",
  isSbdEnabled: false,
  nodeName: "",
  nodeAddresses: {
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    address6: "",
    address7: "",
    address8: "",
  },
  nodeCheck: "not-started",
  nodeCheckMessage: "",
  libCall: initialLibCall,
  showValidationErrors: false,
  sbdWatchdog: "",
  sbdDevices: ["", "", ""],
  sbdNoWatchdogValidation: false,
  authProcessId: null,
};

export const nodeAdd: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.ADD.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        isSbdEnabled: action.payload.isSbdEnabled,
      };

    case "NODE.ADD.UPDATE_NODE_NAME":
      return {
        ...state,
        nodeName: action.payload.nodeName,
        nodeCheck: "not-started",
        nodeCheckMessage: "",
        authProcessId: null,
      };

    case "NODE.ADD.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "NODE.ADD.CHECK_CAN_ADD":
      return {
        ...state,
        nodeCheck: "can-add-started",
        nodeCheckMessage: "",
      };

    case "NODE.ADD.CHECK_CAN_ADD.FAIL":
      return {
        ...state,
        nodeCheck: "can-add-failed",
        nodeCheckMessage: action.payload.message,
      };

    case "NODE.ADD.CHECK_CAN_ADD.CANNOT":
      return {
        ...state,
        nodeCheck: "can-add-cannot",
        nodeCheckMessage: action.payload.message,
      };

    case "NODE.ADD.CHECK_AUTH":
      return {
        ...state,
        nodeCheck: "auth-check-started",
        nodeCheckMessage: "",
      };

    case "NODE.ADD.CHECK_AUTH.NO_AUTH":
      return {
        ...state,
        authProcessId: action.payload.authProcessId,
        nodeCheck: "auth-in-progress",
        nodeCheckMessage: "",
      };

    case "NODE.ADD.CHECK_AUTH.FAIL":
      return {
        ...state,
        nodeCheck: "auth-check-failed",
        nodeCheckMessage: action.payload.message,
      };

    case "NODE.ADD.SEND_KNOWN_HOSTS":
      return {
        ...state,
        authProcessId: null,
        nodeCheck: "send-known-hosts-started",
        nodeCheckMessage: "",
      };

    case "NODE.ADD.SEND_KNOWN_HOSTS.OK":
      return {
        ...state,
        nodeCheck: "success",
        nodeCheckMessage: "",
      };

    case "NODE.ADD.SEND_KNOWN_HOSTS.FAIL":
      return {
        ...state,
        nodeCheck: "send-known-hosts-fail",
        nodeCheckMessage: action.payload.message,
      };

    case "NODE.ADD.CLOSE":
      return initialState;

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    default:
      return {...state, libCall: libCall(state.libCall, action)};
  }
};
