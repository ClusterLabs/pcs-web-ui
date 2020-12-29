export type NodeAuthActions = {
  "NODE.AUTH.START": {
    type: "NODE.AUTH.START";
    payload: {
      processId: number;
      initialNodeList: string[];
    };
  };
  "NODE.AUTH.UPDATE.NODE": {
    type: "NODE.AUTH.UPDATE.NODE";
    payload: {
      processId: number;
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
    payload: {
      processId: number;
      enable: boolean;
    };
  };
  "NODE.AUTH": {
    type: "NODE.AUTH";
    payload: {
      processId: number;
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
    payload: {
      processId: number;
      message: string;
    };
  };

  "NODE.AUTH.BAD_INFO": {
    type: "NODE.AUTH.BAD_INFO";
    payload: {
      processId: number;
    };
  };

  "NODE.AUTH.OK": {
    type: "NODE.AUTH.OK";
    payload: {
      processId: number;
    };
  };
};
