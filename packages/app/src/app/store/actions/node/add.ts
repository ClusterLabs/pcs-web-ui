export type NodeAddActions = {
  "NODE.ADD.INIT": {
    type: "NODE.ADD.INIT";
    payload: {
      isSbdEnabled: boolean;
    };
  };
  "NODE.ADD.CLOSE": {
    type: "NODE.ADD.CLOSE";
  };

  "NODE.ADD.UPDATE": {
    type: "NODE.ADD.UPDATE";
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
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS";
    payload: {
      nodeName: string;
    };
  };
  "NODE.ADD.SEND_KNOWN_HOSTS.FAIL": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.FAIL";
    payload: {
      message: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS.OK": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.OK";
  };

  "NODE.ADD.CHECK_AUTH": {
    type: "NODE.ADD.CHECK_AUTH";
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.FAIL": {
    type: "NODE.ADD.CHECK_AUTH.FAIL";
    payload: {
      message: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.NO_AUTH": {
    type: "NODE.ADD.CHECK_AUTH.NO_AUTH";
    payload: {
      authProcessId: number;
    };
  };

  "NODE.ADD.CHECK_AUTH.OK": {
    type: "NODE.ADD.CHECK_AUTH.OK";
  };
};
