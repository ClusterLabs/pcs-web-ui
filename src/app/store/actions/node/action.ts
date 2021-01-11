export type NodeActionActions = {
  "NODE.START": {
    type: "NODE.START";
    key: { clusterName: string };
    payload: {
      nodeName: string;
    };
  };
  "NODE.STOP": {
    type: "NODE.STOP";
    key: { clusterName: string };
    payload: {
      nodeName: string;
    };
  };
};
