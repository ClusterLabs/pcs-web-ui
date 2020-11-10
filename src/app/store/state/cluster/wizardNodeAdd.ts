import { api } from "app/backend";
import { Reducer } from "app/store/redux";

export type WizardNodeAdd = {
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
    | "auth-started"
    | "auth-failed"
    | "auth-required"
    | "auth-bad-info"
    | "auth-progress"
    | "send-known-hosts-started"
    | "success";
  nodeCheckMessage: string;
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
  reports: api.types.lib.Report[];
  showValidationErrors: boolean;
  sbdWatchdog: string;
  sbdDevices: [string, string, string];
  sbdNoWatchdogValidation: boolean;
};

const initialState: WizardNodeAdd = {
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
  response: "no-response",
  reports: [],
  showValidationErrors: false,
  sbdWatchdog: "",
  sbdDevices: ["", "", ""],
  sbdNoWatchdogValidation: false,
};

const wizardNodeAdd: Reducer<WizardNodeAdd> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.ADD.UPDATE_NODE_NAME":
      return {
        ...state,
        nodeName: action.payload.nodeName,
        nodeCheck: "not-started",
        nodeCheckMessage: "",
        response: "no-response",
      };

    case "NODE.ADD.UPDATE":
      return {
        ...state,
        ...action.payload.state,
      };
    case "NODE.ADD.CHECK_CAN_ADD":
      return {
        ...state,
        nodeCheck: "can-add-started",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.CHECK_CAN_ADD.FAILED":
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
        nodeCheck: "auth-started",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.CHECK_AUTH.NO_AUTH":
      return {
        ...state,
        nodeCheck: "auth-required",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.CHECK_AUTH.FAILED":
      return {
        ...state,
        nodeCheck: "auth-failed",
        nodeCheckMessage: action.payload.message,
      };
    case "NODE.ADD.AUTHENTICATE":
      return {
        ...state,
        nodeCheck: "auth-progress",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.AUTHENTICATE.FAILED":
      return {
        ...state,
        nodeCheck: "auth-required",
        nodeCheckMessage: action.payload.message,
      };
    case "NODE.ADD.AUTHENTICATE.BAD_INFO":
      return {
        ...state,
        nodeCheck: "auth-bad-info",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.SEND_KNOWN_HOSTS":
      return {
        ...state,
        nodeCheck: "send-known-hosts-started",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.SEND_KNOWN_HOSTS.SUCCESS":
      return {
        ...state,
        nodeCheck: "success",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.CLOSE":
      return initialState;
    case "NODE.ADD.SUCCESS":
      return { ...state, response: "success", reports: action.payload.reports };
    case "NODE.ADD.FAILED":
      return { ...state, response: "fail", reports: action.payload.reports };
    case "NODE.ADD.ERROR":
      return { ...state, response: "communication-error" };
    case "CLUSTER_WIZARD.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };
    case "CLUSTER_WIZARD.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };
    default:
      return state;
  }
};

export default wizardNodeAdd;
