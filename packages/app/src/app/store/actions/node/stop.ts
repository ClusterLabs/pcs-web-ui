export type NodeStopActions = {
  "NODE.STOP": {
    type: "NODE.STOP";
    key: {clusterName: string};
    payload: {
      nodeName: string;
      force: boolean;
    };
  };
  "NODE.STOP.INIT": {
    type: "NODE.STOP.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      nodeName: string;
    };
  };

  "NODE.STOP.OK": {
    type: "NODE.STOP.OK";
    key: {clusterName: string};
  };

  "NODE.STOP.FAIL": {
    type: "NODE.STOP.FAIL";
    key: {clusterName: string};
    payload: {
      message: string;
      isForceable: boolean;
    };
  };

  "NODE.STOP.CLOSE": {
    type: "NODE.STOP.CLOSE";
    key: {clusterName: string};
  };
};
