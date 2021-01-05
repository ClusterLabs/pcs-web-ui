import { NodeAddActions } from "./add";
import { NodeAuthActions } from "./auth";

export type NodeActions = NodeAddActions &
  NodeAuthActions & {
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
