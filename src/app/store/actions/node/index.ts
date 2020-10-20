import * as add from "./add";

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
  NodeAddUpdate: add.Update;
  NodeAddCheckCanAdd: add.CheckCanAdd;
  NodeAddCheckCanAddFailed: add.CheckCanAddFailed;
  NodeAddCheckAuth: add.CheckAuth;
  NodeAddCheckAuthFailed: add.CheckAuthFailed;
  NodeAddCheckAuthSuccess: add.CheckAuthSuccess;
};
