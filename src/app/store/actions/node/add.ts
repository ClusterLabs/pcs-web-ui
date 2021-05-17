export type NodeAddActions = {
  "NODE.ADD.CLOSE": {
    type: "NODE.ADD.CLOSE";
    key: { clusterName: string };
  };

  "NODE.ADD.UPDATE": {
    type: "NODE.ADD.UPDATE";
    key: { clusterName: string };
    payload: {
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

  "NODE.ADD.UPDATE_NODE_NAME": {
    type: "NODE.ADD.UPDATE_NODE_NAME";
    key: { clusterName: string };
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD": {
    type: "NODE.ADD.CHECK_CAN_ADD";
    key: { clusterName: string };
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD.CANNOT": {
    type: "NODE.ADD.CHECK_CAN_ADD.CANNOT";
    key: { clusterName: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD.FAIL": {
    type: "NODE.ADD.CHECK_CAN_ADD.FAIL";
    key: { clusterName: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS";
    key: { clusterName: string };
    payload: {
      nodeName: string;
    };
  };
  "NODE.ADD.SEND_KNOWN_HOSTS.FAIL": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.FAIL";
    key: { clusterName: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS.OK": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.OK";
    key: { clusterName: string };
  };

  "NODE.ADD.CHECK_AUTH": {
    type: "NODE.ADD.CHECK_AUTH";
    key: { clusterName: string };
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.FAIL": {
    type: "NODE.ADD.CHECK_AUTH.FAIL";
    key: { clusterName: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.NO_AUTH": {
    type: "NODE.ADD.CHECK_AUTH.NO_AUTH";
    key: { clusterName: string };
    payload: {
      authProcessId: number;
    };
  };

  "NODE.ADD.CHECK_AUTH.OK": {
    type: "NODE.ADD.CHECK_AUTH.OK";
    key: { clusterName: string };
  };
};
