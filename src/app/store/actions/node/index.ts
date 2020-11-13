import { NodeAddActions } from "./add";

export type NodeActions = NodeAddActions & {
  "NODE.START": {
    type: "NODE.START";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
  "NODE.STOP": {
    type: "NODE.STOP";
    payload: {
      clusterUrlName: string;
      nodeName: string;
    };
  };
};
