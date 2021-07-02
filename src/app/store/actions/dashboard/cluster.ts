import { clusterSetup } from "app/backend";
import { LibReport } from "app/store/types";
export type DashboardClusterActions = {
  "DASHBOARD.CLUSTER.REMOVE": {
    type: "DASHBOARD.CLUSTER.REMOVE";
    payload: {
      clusterName: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE";
    payload: {
      transportType: "knet" | "udp" | "udpu";
    };
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME";
    payload: {
      clusterName: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES";
    payload: {
      nodeNameList: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD";
    payload: {
      clusterName: string;
      targetNode: string;
      nodeNameList: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.CANNOT": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.CANNOT";
    payload: {
      errors: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH";
    payload: {
      targetNode: string;
      nodeNameList: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.NO_AUTH": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.NO_AUTH";
    payload: {
      authProcessId: number;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.OK": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.OK";
  };

  "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS": {
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS";
    payload: {
      targetNode: string;
      nodeNameList: string[];
    };
  };
  "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK": {
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK";
  };

  "DASHBOARD.CLUSTER.SETUP.CLOSE": {
    type: "DASHBOARD.CLUSTER.SETUP.CLOSE";
  };

  "DASHBOARD.CLUSTER.SETUP.CALL": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL";
    payload: Parameters<typeof clusterSetup>[0];
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.CANCEL": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.CANCEL";
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.OK": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.OK";
    payload: {
      reports: LibReport[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.FAIL";
    payload: {
      reports: LibReport[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.ERROR": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.ERROR";
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.RESPONSE.RESET": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.RESPONSE.RESET";
  };
};
