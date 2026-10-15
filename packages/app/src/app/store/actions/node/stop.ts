export type NodeStopActions = {
  "NODE.STOP": {
    type: "NODE.STOP";
    payload: {
      nodeName: string;
      force: boolean;
    };
  };
  "NODE.STOP.INIT": {
    type: "NODE.STOP.INIT";
    payload: {
      clusterName: string;
      nodeName: string;
    };
  };

  "NODE.STOP.OK": {
    type: "NODE.STOP.OK";
  };

  "NODE.STOP.FAIL": {
    type: "NODE.STOP.FAIL";
    payload: {
      message: string;
      isForceable: boolean;
    };
  };

  "NODE.STOP.CLOSE": {
    type: "NODE.STOP.CLOSE";
  };
};
