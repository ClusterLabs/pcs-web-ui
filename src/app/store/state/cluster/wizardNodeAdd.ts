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
    | "started-can-add"
    | "cannot-add"
    | "can-add-failed"
    | "started-auth"
    | "auth-failed"
    | "auth-required"
    | "auth-bad-info"
    | "auth-progress"
    | "started-send-known-hosts"
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
};

const wizardNodeAdd: Reducer<WizardNodeAdd> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.ADD.UPDATE":
      return {
        ...state,
        ...action.payload.state,
        nodeCheck:
          "nodeName" in action.payload.state
          && action.payload.state.nodeName !== state.nodeName
            ? "not-started"
            : state.nodeCheck,
        nodeCheckMessage: "",
      };
    case "NODE.ADD.CHECK_CAN_ADD":
      return {
        ...state,
        nodeCheck: "started-can-add",
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
        nodeCheck: "cannot-add",
        nodeCheckMessage: action.payload.message,
      };
    case "NODE.ADD.CHECK_AUTH":
      return {
        ...state,
        nodeCheck: "started-auth",
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
        nodeCheck: "started-send-known-hosts",
        nodeCheckMessage: "",
      };
    case "NODE.ADD.SEND_KNOWN_HOSTS.SUCCESS":
      return {
        ...state,
        nodeCheck: "success",
        nodeCheckMessage: "",
      };
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
