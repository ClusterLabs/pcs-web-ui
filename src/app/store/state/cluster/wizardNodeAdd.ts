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
    | "started-auth"
    | "auth-failed"
    | "success";
  reports: api.types.lib.Report[];
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
  reports: [],
};

const wizardNodeAdd: Reducer<WizardNodeAdd> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "NODE.ADD.UPDATE": {
      return {
        ...state,
        ...action.payload.state,
        nodeCheck:
          "nodeName" in action.payload.state
          && action.payload.state.nodeName !== state.nodeName
            ? "not-started"
            : state.nodeCheck,
      };
    }
    case "NODE.ADD.CHECK_CAN_ADD":
      return {
        ...state,
        nodeCheck: "started-can-add",
      };
    case "NODE.ADD.CHECK_AUTH":
      return {
        ...state,
        nodeCheck: "started-auth",
      };
    case "NODE.ADD.CHECK_AUTH.FAILED":
      return {
        ...state,
        nodeCheck: "auth-failed",
      };
    case "NODE.ADD.CHECK_AUTH.SUCCESS":
      return {
        ...state,
        nodeCheck: "success",
      };
    default:
      return state;
  }
};

export default wizardNodeAdd;
