import { api, clusterProperties } from "app/backend";

export type ClusterPropertiesActions = {
  "CLUSTER.PROPERTIES.LOAD": {
    type: "CLUSTER.PROPERTIES.LOAD";
    key: { clusterName: string };
  };

  "CLUSTER.PROPERTIES.LOAD.OK": {
    type: "CLUSTER.PROPERTIES.LOAD.OK";
    key: { clusterName: string };
    payload: {
      apiClusterProperties: api.PayloadOf<typeof clusterProperties>;
    };
  };

  "CLUSTER.PROPERTIES.LOAD.ERROR": {
    type: "CLUSTER.PROPERTIES.LOAD.ERROR";
    key: { clusterName: string };
  };

  "CLUSTER.PROPERTIES.UPDATE": {
    type: "CLUSTER.PROPERTIES.UPDATE";
    key: { clusterName: string };
    payload: {
      propertyMap: Record<string, string>;
    };
  };
};
