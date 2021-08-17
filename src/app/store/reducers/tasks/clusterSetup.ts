import { AppReducer } from "app/store/reducers/appReducer";
import { ActionPayload } from "app/store/actions";

import {
  initialState as initalLibCall,
  libCall,
} from "../cluster/tasks/libCall";

const initialState: {
  clusterName: string;
  nodeNameList: string[];
  libCall: typeof initalLibCall;
  clusterAndNodesCheck:
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
  clusterAndNodesCheckMessage: string;
  canAddClusterOrNodesMessages: string[];
  authProcessId: number | null;
  showValidationErrors: boolean;
  quorumOptions: Required<
    ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS"]
  >;
} & (
  | {
      transportType: "knet";
      linkList: ActionPayload["DASHBOARD.CLUSTER.SETUP.UPDATE_LINK_KNET"][];
    }
  | {
      transportType: "udp" | "udpu";
      linkList: string[];
    }
) = {
  clusterName: "test-cluster",
  nodeNameList: ["node-1", "node-2", "node-3"],
  quorumOptions: {
    autoTieBreaker: "default",
    lastManStanding: "default",
    lastManStandingWindow: "",
    waitForAll: "default",
  },
  transportType: "knet",
  linkList: [
    {
      linknumber: 0,
      addresses: { "node-1": "addr1", "node-2": "addr2", "node-3": "addr3" },
      mcastport: "1111",
      link_priority: "10",
      ping_interval: "11",
      ping_precision: "12",
      ping_timeout: "13",
      pong_count: "14",
      transport: "udp",
    },
    {
      linknumber: 1,
      addresses: { "node-1": "addr1", "node-2": "addr2", "node-3": "addr3" },
      mcastport: "2111",
      link_priority: "20",
      ping_interval: "21",
      ping_precision: "22",
      ping_timeout: "23",
      pong_count: "24",
    },
    {
      linknumber: 2,
      addresses: { "node-1": "addr1", "node-2": "addr2", "node-3": "addr3" },
    },
  ],
  clusterAndNodesCheck: "not-started",
  clusterAndNodesCheckMessage: "",
  canAddClusterOrNodesMessages: [],
  libCall: initalLibCall,
  authProcessId: null,
  showValidationErrors: false,
};

export const clusterSetup: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME":
      return {
        ...state,
        clusterAndNodesCheck: "not-started",
        clusterAndNodesCheckMessage: "",
        clusterName: action.payload.clusterName,
      };

    case "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES":
      return {
        ...state,
        nodeNameList: action.payload.nodeNameList,
        clusterAndNodesCheck: "not-started",
        clusterAndNodesCheckMessage: "",
      };

    case "DASHBOARD.CLUSTER.SETUP.UPDATE_LINK_KNET":
      return {
        ...state,
        transportType: "knet",
        linkList: state.linkList.map(link =>
          link.linknumber === action.payload.linknumber ? action.payload : link,
        ),
      };

    case "DASHBOARD.CLUSTER.SETUP.SET_LINKS_KNET":
      return {
        ...state,
        transportType: "knet",
        linkList: action.payload,
      };

    case "DASHBOARD.CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS":
      return {
        ...state,
        quorumOptions: {
          ...state.quorumOptions,
          ...action.payload,
        },
      };

    case "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD":
      return {
        ...state,
        clusterAndNodesCheck: "can-add-started",
        clusterAndNodesCheckMessage: "",
        canAddClusterOrNodesMessages: [],
      };

    case "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.FAIL":
      return {
        ...state,
        clusterAndNodesCheck: "can-add-failed",
        clusterAndNodesCheckMessage: action.payload.message,
      };

    case "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.CANNOT":
      return {
        ...state,
        clusterAndNodesCheck: "can-add-cannot",
        clusterAndNodesCheckMessage: "",
        canAddClusterOrNodesMessages: action.payload.errors,
      };

    case "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH":
      return {
        ...state,
        clusterAndNodesCheck: "auth-check-started",
        clusterAndNodesCheckMessage: "",
        canAddClusterOrNodesMessages: [],
      };

    case "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.NO_AUTH":
      return {
        ...state,
        authProcessId: action.payload.authProcessId,
        clusterAndNodesCheck: "auth-in-progress",
        clusterAndNodesCheckMessage: "",
      };

    case "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.FAIL":
      return {
        ...state,
        clusterAndNodesCheck: "auth-check-failed",
        clusterAndNodesCheckMessage: action.payload.message,
      };

    case "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS":
      return {
        ...state,
        authProcessId: null,
        clusterAndNodesCheck: "send-known-hosts-started",
        clusterAndNodesCheckMessage: "",
        canAddClusterOrNodesMessages: [],
      };

    case "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK":
      return {
        ...state,
        clusterAndNodesCheck: "success",
        clusterAndNodesCheckMessage: "",
      };

    case "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL":
      return {
        ...state,
        clusterAndNodesCheck: "send-known-hosts-fail",
        clusterAndNodesCheckMessage: action.payload.message,
      };

    case "DASHBOARD.CLUSTER.SETUP.CALL":
      return {
        ...state,
        libCall: {
          ...state.libCall,
          response: "progress",
        },
      };

    case "DASHBOARD.CLUSTER.SETUP.CALL.RESPONSE.RESET":
      return {
        ...state,
        libCall: {
          ...state.libCall,
          response: "no-response",
        },
      };

    case "DASHBOARD.CLUSTER.SETUP.CALL.OK":
      return {
        ...state,
        libCall: {
          ...state.libCall,
          response: "success",
          reports: action.payload.reports,
        },
      };

    case "DASHBOARD.CLUSTER.SETUP.CALL.FAIL":
      return {
        ...state,
        libCall: {
          ...state.libCall,
          response: "fail",
          reports: action.payload.reports,
        },
      };

    case "DASHBOARD.CLUSTER.SETUP.CALL.ERROR":
      return {
        ...state,
        libCall: {
          ...state.libCall,
          response: "communication-error",
        },
      };

    case "TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };

    case "TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };

    case "DASHBOARD.CLUSTER.SETUP.CLOSE":
      return initialState;

    default:
      return {
        ...state,
        libCall: libCall(state.libCall, action),
      };
  }
};
