import { NodeAddActions } from "./add";
import { NodeAuthActions } from "./auth";

export type NodeActions = NodeAddActions &
  NodeAuthActions & {
    "NODE.START": {
      type: "NODE.START";
      id: { cluster: string };
      payload: {
        nodeName: string;
      };
    };
    "NODE.STOP": {
      type: "NODE.STOP";
      id: { cluster: string };
      payload: {
        nodeName: string;
      };
    };
  };
