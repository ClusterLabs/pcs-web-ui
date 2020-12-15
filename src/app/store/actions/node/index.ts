import { NodeAddActions } from "./add";
import { NodeAuthActions } from "./auth";

export type NodeActions = NodeAddActions &
  NodeAuthActions & {
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
