import { api, clusterProperties } from "app/backend";

export type ClusterPropertiesActions = {
  "CLUSTER.PROPERTIES.LOAD": {
    type: "CLUSTER.PROPERTIES.LOAD";
    id: { cluster: string };
  };

  "CLUSTER.PROPERTIES.LOAD.OK": {
    type: "CLUSTER.PROPERTIES.LOAD.OK";
    id: { cluster: string };
    payload: {
      apiClusterProperties: api.PayloadOf<typeof clusterProperties>;
    };
  };

  "CLUSTER.PROPERTIES.LOAD.ERROR": {
    type: "CLUSTER.PROPERTIES.LOAD.ERROR";
    id: { cluster: string };
  };
};
