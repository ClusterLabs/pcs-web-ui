export type NodeActions = {
  StartNode: {
    type: "NODE.START";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  StopNode: {
    type: "NODE.STOP";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
};
