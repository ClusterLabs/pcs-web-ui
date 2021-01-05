import { api } from "app/backend";

export type LibActions = {
  "LIB.CALL.CLUSTER": {
    type: "LIB.CALL.CLUSTER";
    id: { cluster: string };
    payload: {
      taskLabel: string;
      call: api.lib.ClusterCommand;
    };
  };
};
