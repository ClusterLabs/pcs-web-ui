import { api } from "app/backend";

export type NodeAuthActions = {
  "NODE.AUTH.START": {
    type: "NODE.AUTH.START";
    key: { process: number };
    payload: {
      initialNodeList: string[];
    };
  };
  "NODE.AUTH.STOP": {
    type: "NODE.AUTH.STOP";
    key: { process: number };
  };
  "NODE.AUTH.UPDATE.NODE": {
    type: "NODE.AUTH.UPDATE.NODE";
    key: { process: number };
    payload: {
      nodeName: string;
      state: {
        password?: string;
        address?: string;
        port?: string;
      };
    };
  };
  "NODE.AUTH.ADDR.ENABLE": {
    type: "NODE.AUTH.ADDR.ENABLE";
    key: { process: number };
    payload: {
      enable: boolean;
    };
  };
  "NODE.AUTH": {
    type: "NODE.AUTH";
    key: { process: number };
    payload: {
      nodeMap: Record<
        string,
        {
          password: string;
          address: string;
          port: string;
        }
      >;
    };
  };
  "NODE.AUTH.FAIL": {
    type: "NODE.AUTH.FAIL";
    key: { process: number };
    payload: {
      message: string;
    };
  };

  "NODE.AUTH.OK": {
    type: "NODE.AUTH.OK";
    key: { process: number };
    payload: {
      response: api.types.authGuiAgainstNodes.ApiAuthGuiAgainstNodes;
    };
  };
};
