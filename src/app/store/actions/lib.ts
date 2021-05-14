import { libCallCluster } from "app/backend";
import { LibReport } from "app/store/types";

export type LibActions = {
  "LIB.CALL.CLUSTER": {
    type: "LIB.CALL.CLUSTER";
    key: { clusterName: string };
    payload: {
      taskLabel: string;
      call: Parameters<typeof libCallCluster>[0]["command"];
    };
  };

  "LIB.CALL.CLUSTER.TASK": {
    type: "LIB.CALL.CLUSTER.TASK";
    key: { clusterName: string; task: string };
    payload: {
      taskLabel: string;
      call: Parameters<typeof libCallCluster>[0]["command"];
    };
  };

  "LIB.CALL.CLUSTER.TASK.OK": {
    type: "LIB.CALL.CLUSTER.TASK.OK";
    key: { clusterName: string; task: string };
    payload: {
      reports: LibReport[];
    };
  };

  "LIB.CALL.CLUSTER.TASK.FAIL": {
    type: "LIB.CALL.CLUSTER.TASK.FAIL";
    key: { clusterName: string; task: string };
    payload: {
      reports: LibReport[];
    };
  };
  "LIB.CALL.CLUSTER.TASK.ERROR": {
    type: "LIB.CALL.CLUSTER.TASK.ERROR";
    key: { clusterName: string; task: string };
  };
};
