import type {api} from "app/backend";
import type {
  CommandResponseData,
  Commands,
} from "app/backend/endpoints/lib/cluster/libCluster";
import type {LibReport} from "app/store/types";

type TaskOkPayloadFor<C> = C extends Commands[number]
  ? {
      commandName: C["name"];
      reports: LibReport[];
      data: CommandResponseData[C["name"]];
    }
  : never;

export type LibActions = {
  "LIB.CALL.CLUSTER": {
    type: "LIB.CALL.CLUSTER";
    key: {clusterName: string};
    payload: {
      taskLabel: string;
      call: api.Lib.ClusterCall;
    };
  };

  "LIB.CALL.CLUSTER.FORCE-FLAGS.ADD": {
    type: "LIB.CALL.CLUSTER.FORCE-FLAGS.ADD";
    key: {clusterName: string; task: string};
    payload: {
      forceFlags: string[];
    };
  };

  "LIB.CALL.CLUSTER.TASK": {
    type: "LIB.CALL.CLUSTER.TASK";
    key: {clusterName: string; task: string};
    payload: {
      taskLabel: string;
      call: api.Lib.ClusterCall;
    };
  };

  "LIB.CALL.CLUSTER.TASK.CANCEL": {
    type: "LIB.CALL.CLUSTER.TASK.CANCEL";
    key: {clusterName: string; task: string};
  };

  "LIB.CALL.CLUSTER.TASK.OK": {
    type: "LIB.CALL.CLUSTER.TASK.OK";
    key: {clusterName: string; task: string};
    payload: TaskOkPayloadFor<Commands[number]>;
  };

  "LIB.CALL.CLUSTER.TASK.FAIL": {
    type: "LIB.CALL.CLUSTER.TASK.FAIL";
    key: {clusterName: string; task: string};
    payload: {
      commandName: Commands[number]["name"];
      reports: LibReport[];
    };
  };

  "LIB.CALL.CLUSTER.TASK.ERROR": {
    type: "LIB.CALL.CLUSTER.TASK.ERROR";
    key: {clusterName: string; task: string};
    payload: {
      commandName: Commands[number]["name"];
    };
  };

  "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET": {
    type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET";
    key: {task: string};
  };
};
