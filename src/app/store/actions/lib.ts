import { api } from "app/backend";

type Commands = api.endpoints.LibClusterCommands;

export type LibActions = {
  "LIB.CALL.CLUSTER": {
    type: "LIB.CALL.CLUSTER";
    key: { clusterName: string };
    payload: {
      taskLabel: string;
      call: {
        [K in keyof Commands]: { command: K; payload: Commands[K] };
      }[keyof Commands];
    };
  };
};
