import type {api, getClusterPropertiesDefinition} from "app/backend";

export type ClusterPropertiesActions = {
  "CLUSTER.PROPERTIES.LOAD": {
    type: "CLUSTER.PROPERTIES.LOAD";
    key: {clusterName: string};
  };

  "CLUSTER.PROPERTIES.LOAD.OK": {
    type: "CLUSTER.PROPERTIES.LOAD.OK";
    key: {clusterName: string};
    payload: {
      apiClusterProperties: api.PayloadOf<
        typeof getClusterPropertiesDefinition
      >;
    };
  };

  "CLUSTER.PROPERTIES.LOAD.ERROR": {
    type: "CLUSTER.PROPERTIES.LOAD.ERROR";
    key: {clusterName: string};
  };

  "CLUSTER.PROPERTIES.UPDATE.INIT": {
    type: "CLUSTER.PROPERTIES.UPDATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      propertyMap: Record<string, string>;
    };
  };

  "CLUSTER.PROPERTIES.UPDATE": {
    type: "CLUSTER.PROPERTIES.UPDATE";
    key: {clusterName: string};
    payload: {
      propertyMap: Record<string, string>;
    };
  };
  "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM": {
    type: "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM";
    key: {clusterName: string};
    payload: {
      name: string;
      value: string;
    };
  };
  "CLUSTER.PROPERTIES.UPDATE.CLOSE": {
    type: "CLUSTER.PROPERTIES.UPDATE.CLOSE";
    key: {clusterName: string};
  };
  "CLUSTER.PROPERTIES.UPDATE.OK": {
    type: "CLUSTER.PROPERTIES.UPDATE.OK";
    key: {clusterName: string};
  };
  "CLUSTER.PROPERTIES.UPDATE.FAIL": {
    type: "CLUSTER.PROPERTIES.UPDATE.FAIL";
    key: {clusterName: string};
    payload: {message: string};
  };
  "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER": {
    type: "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER";
    key: {clusterName: string};
  };
};
