import { api } from "app/backend";

export type LibActions = {
  "LIB.CALL.CLUSTER": {
    type: "LIB.CALL.CLUSTER";
    key: { clusterName: string };
    payload: {
      taskLabel: string;
      call: api.lib.ClusterCommand;
    };
  };
};
