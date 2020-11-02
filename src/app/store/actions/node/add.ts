import { api } from "app/backend";

export type Add = {
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

export type AddSuccess = {
  type: "NODE.ADD.SUCCESS";
  payload: {
    clusterUrlName: string;
    reports: api.types.lib.Report[];
  };
};

export type AddFailed = {
  type: "NODE.ADD.FAILED";
  payload: {
    clusterUrlName: string;
    reports: api.types.lib.Report[];
  };
};
export type AddError = {
  type: "NODE.ADD.ERROR";
  payload: {
    clusterUrlName: string;
  };
};

export type Update = {
  type: "NODE.ADD.UPDATE";
  payload: {
    clusterUrlName: string;
    state: {
      nodeName?: string;
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

export type CheckCanAdd = {
  type: "NODE.ADD.CHECK_CAN_ADD";
  payload: {
    clusterUrlName: string;
    nodeName: string;
  };
};

export type CheckCanAddCannot = {
  type: "NODE.ADD.CHECK_CAN_ADD.CANNOT";
  payload: {
    clusterUrlName: string;
    message: string;
  };
};

export type CheckCanAddFailed = {
  type: "NODE.ADD.CHECK_CAN_ADD.FAILED";
  payload: {
    clusterUrlName: string;
    message: string;
  };
};

export type SendKnownHosts = {
  type: "NODE.ADD.SEND_KNOWN_HOSTS";
  payload: {
    clusterUrlName: string;
    nodeName: string;
  };
};
export type SendKnownHostsFailed = {
  type: "NODE.ADD.SEND_KNOWN_HOSTS.FAILED";
  payload: {
    clusterUrlName: string;
  };
};

export type SendKnownHostsSuccess = {
  type: "NODE.ADD.SEND_KNOWN_HOSTS.SUCCESS";
  payload: {
    clusterUrlName: string;
  };
};

export type CheckAuth = {
  type: "NODE.ADD.CHECK_AUTH";
  payload: {
    clusterUrlName: string;
    nodeName: string;
  };
};

export type CheckAuthFailed = {
  type: "NODE.ADD.CHECK_AUTH.FAILED";
  payload: {
    clusterUrlName: string;
    message: string;
  };
};

export type CheckAuthNoAuth = {
  type: "NODE.ADD.CHECK_AUTH.NO_AUTH";
  payload: {
    clusterUrlName: string;
  };
};

export type CheckAuthSuccess = {
  type: "NODE.ADD.CHECK_AUTH.SUCCESS";
  payload: {
    clusterUrlName: string;
  };
};

export type Authenticate = {
  type: "NODE.ADD.AUTHENTICATE";
  payload: {
    clusterUrlName: string;
    nodeName: string;
    password: string;
    address: string;
    port: string;
  };
};

export type AuthenticateFailed = {
  type: "NODE.ADD.AUTHENTICATE.FAILED";
  payload: {
    clusterUrlName: string;
    message: string;
  };
};

export type AuthenticateBadInfo = {
  type: "NODE.ADD.AUTHENTICATE.BAD_INFO";
  payload: {
    clusterUrlName: string;
  };
};
