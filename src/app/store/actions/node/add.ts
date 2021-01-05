import { api } from "app/backend";

export type NodeAddActions = {
  "NODE.ADD": {
    type: "NODE.ADD";
    id: { cluster: string };
    payload: {
      nodeName: string;
      nodeAddresses: string[];
      sbdWatchdog: string;
      sbdNoWatchdogValidation: boolean;
      sbdDevices: string[];
    };
  };
  "NODE.ADD.CLOSE": {
    type: "NODE.ADD.CLOSE";
    id: { cluster: string };
  };

  "NODE.ADD.OK": {
    type: "NODE.ADD.OK";
    id: { cluster: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "NODE.ADD.FAIL": {
    type: "NODE.ADD.FAIL";
    id: { cluster: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };
  "NODE.ADD.ERROR": {
    type: "NODE.ADD.ERROR";
    id: { cluster: string };
  };

  "NODE.ADD.UPDATE": {
    type: "NODE.ADD.UPDATE";
    id: { cluster: string };
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
    id: { cluster: string };
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD": {
    type: "NODE.ADD.CHECK_CAN_ADD";
    id: { cluster: string };
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD.CANNOT": {
    type: "NODE.ADD.CHECK_CAN_ADD.CANNOT";
    id: { cluster: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.CHECK_CAN_ADD.FAIL": {
    type: "NODE.ADD.CHECK_CAN_ADD.FAIL";
    id: { cluster: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS";
    id: { cluster: string };
    payload: {
      nodeName: string;
    };
  };
  "NODE.ADD.SEND_KNOWN_HOSTS.FAIL": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.FAIL";
    id: { cluster: string };
  };

  "NODE.ADD.SEND_KNOWN_HOSTS.OK": {
    type: "NODE.ADD.SEND_KNOWN_HOSTS.OK";
    id: { cluster: string };
  };

  "NODE.ADD.CHECK_AUTH": {
    type: "NODE.ADD.CHECK_AUTH";
    id: { cluster: string };
    payload: {
      nodeName: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.FAIL": {
    type: "NODE.ADD.CHECK_AUTH.FAIL";
    id: { cluster: string };
    payload: {
      message: string;
    };
  };

  "NODE.ADD.CHECK_AUTH.NO_AUTH": {
    type: "NODE.ADD.CHECK_AUTH.NO_AUTH";
    id: { cluster: string };
    payload: {
      authProcessId: number;
    };
  };

  "NODE.ADD.CHECK_AUTH.OK": {
    type: "NODE.ADD.CHECK_AUTH.OK";
    id: { cluster: string };
  };
};
