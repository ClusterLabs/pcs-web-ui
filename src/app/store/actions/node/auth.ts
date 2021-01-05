import { api } from "app/backend";

export type NodeAuthActions = {
  "NODE.AUTH.START": {
    type: "NODE.AUTH.START";
    id: { process: number };
    payload: {
      initialNodeList: string[];
    };
  };
  "NODE.AUTH.STOP": {
    type: "NODE.AUTH.STOP";
    id: { process: number };
  };
  "NODE.AUTH.UPDATE.NODE": {
    type: "NODE.AUTH.UPDATE.NODE";
    id: { process: number };
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
    id: { process: number };
    payload: {
      enable: boolean;
    };
  };
  "NODE.AUTH": {
    type: "NODE.AUTH";
    id: { process: number };
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
    id: { process: number };
    payload: {
      message: string;
    };
  };

  "NODE.AUTH.OK": {
    type: "NODE.AUTH.OK";
    id: { process: number };
    payload: {
      response: api.types.authGuiAgainstNodes.ApiAuthGuiAgainstNodes;
    };
  };
};
