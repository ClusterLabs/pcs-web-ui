import { api } from "app/backend";

export type NodeAddActions = {
  "NODE.ADD": {
    type: "NODE.ADD";
    payload: {
      clusterUrlName: string;
      nodeName: string;
      nodeAddresses: string[];
      sbdWatchdog: string;
      sbdNoWatchdogValidation: boolean;
      sbdDevices: string[];
    };
  };
  "NODE.ADD.CLOSE": {
    type: "NODE.ADD.CLOSE";
    payload: {
      clusterUrlName: string;
    };
  };

  "NODE.ADD.OK": {
    type: "NODE.ADD.OK";
    payload: {
      clusterUrlName: string;
      reports: api.types.lib.Report[];
    };
  };

  "NODE.ADD.FAIL": {
    type: "NODE.ADD.FAIL";
    payload: {
      clusterUrlName: string;
      reports: api.types.lib.Report[];
    };
  };
  "NODE.ADD.ERROR": {
    type: "NODE.ADD.ERROR";
    payload: {
      clusterUrlName: string;
    };
  };

  "NODE.ADD.UPDATE": {
    type: "NODE.ADD.UPDATE";
    payload: {
      clusterUrlName: string;
      state: {
        nodeAddresses?: {
          address1: string;
          address2: string;
          address3: string;
          address4: string;
          address5: string;
          address6: string;
          address7: string;
          address8: string;
        };
        sbdWatchdog?: string;
        sbdDevices?: [string, string, string];
        sbdNoWatchdogValidation?: boolean;
      };
    };
  };

  "NODE.ADD.UPDATE_NODE_NAME": {
    type: "NODE.ADD.UPDATE_NODE_NAME";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD": {
    type: "NODE.ADD.CHECK_CAN_ADD";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD.CANNOT": {
    type: "NODE.ADD.CHECK_CAN_ADD.CANNOT";
    payload: {
      clusterUrlName: string;
      message: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD.FAIL": {
    type: "NODE.ADD.CHECK_CAN_ADD.FAIL";
    payload: {
      clusterUrlName: string;
      message: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  "NODE.ADD.SEND_KNOWN_HOSTS.FAIL": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.FAIL";
    payload: {
      clusterUrlName: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS.OK": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.OK";
    payload: {
      clusterUrlName: string;
    };
  };

  "NODE.ADD.CHECK_AUTH": {
    type: "NODE.ADD.CHECK_AUTH";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.FAIL": {
    type: "NODE.ADD.CHECK_AUTH.FAIL";
    payload: {
      clusterUrlName: string;
      message: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.NO_AUTH": {
    type: "NODE.ADD.CHECK_AUTH.NO_AUTH";
    payload: {
      clusterUrlName: string;
      authProcessId: number;
    };
  };

  "NODE.ADD.CHECK_AUTH.OK": {
    type: "NODE.ADD.CHECK_AUTH.OK";
    payload: {
      clusterUrlName: string;
    };
  };
};
