export type NodeAuthActions = {
  "NODE.AUTH.START": {
    type: "NODE.AUTH.START";
    payload: {
      clusterUrlName: string;
      initialNodeList: string[];
    };
  };
  "NODE.AUTH.UPDATE.NODE": {
    type: "NODE.AUTH.UPDATE.NODE";
    payload: {
      clusterUrlName: string;
      nodeName: string;
      state: {
        password?: string;
        address?: string;
        port?: string;
      };
    };
  };
  "NODE.AUTH": {
    type: "NODE.AUTH";
    payload: {
      clusterUrlName: string;
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
      clusterUrlName: string;
      message: string;
    };
  };

  "NODE.AUTH.BAD_INFO": {
    type: "NODE.AUTH.BAD_INFO";
    payload: {
      clusterUrlName: string;
    };
  };
};
