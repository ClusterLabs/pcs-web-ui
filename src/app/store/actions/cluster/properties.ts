import { api, clusterProperties } from "app/backend";

export type ClusterPropertiesActions = {
  "CLUSTER.PROPERTIES.LOAD": {
    type: "CLUSTER.PROPERTIES.LOAD";
    payload: {
      clusterUrlName: string;
    };
  };

  "CLUSTER.PROPERTIES.LOAD.OK": {
    type: "CLUSTER.PROPERTIES.LOAD.OK";
    payload: {
      clusterUrlName: string;
      apiClusterProperties: api.PayloadOf<typeof clusterProperties>;
    };
  };

  "CLUSTER.PROPERTIES.LOAD.ERROR": {
    type: "CLUSTER.PROPERTIES.LOAD.ERROR";
    payload: {
      clusterUrlName: string;
    };
  };
};
