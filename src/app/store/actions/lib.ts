import { api } from "app/backend";

export type LibActions = {
  "LIB.CALL.CLUSTER": {
    type: "LIB.CALL.CLUSTER";
    payload: {
      clusterUrlName: string;
      taskLabel: string;
      call: api.lib.ClusterCommand;
    };
  };
};
