import type {api, getClusterPropertiesDefinition} from "app/backend";

export type ClusterPropertiesActions = {
  "CLUSTER.PROPERTIES.LOAD": {
    type: "CLUSTER.PROPERTIES.LOAD";
  };

  "CLUSTER.PROPERTIES.LOAD.OK": {
    type: "CLUSTER.PROPERTIES.LOAD.OK";
    payload: {
      apiClusterProperties: api.PayloadOf<
        typeof getClusterPropertiesDefinition
      >;
    };
  };

  "CLUSTER.PROPERTIES.LOAD.ERROR": {
    type: "CLUSTER.PROPERTIES.LOAD.ERROR";
  };

  "CLUSTER.PROPERTIES.UPDATE.INIT": {
    type: "CLUSTER.PROPERTIES.UPDATE.INIT";
    payload: {
      clusterName: string;
      propertyMap: Record<string, string>;
    };
  };

  "CLUSTER.PROPERTIES.UPDATE": {
    type: "CLUSTER.PROPERTIES.UPDATE";
    payload: {
      propertyMap: Record<string, string>;
      force: boolean;
    };
  };
  "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM": {
    type: "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM";
    payload: {
      name: string;
      value: string;
    };
  };
  "CLUSTER.PROPERTIES.UPDATE.CLOSE": {
    type: "CLUSTER.PROPERTIES.UPDATE.CLOSE";
  };
  "CLUSTER.PROPERTIES.UPDATE.OK": {
    type: "CLUSTER.PROPERTIES.UPDATE.OK";
  };
  "CLUSTER.PROPERTIES.UPDATE.FAIL": {
    type: "CLUSTER.PROPERTIES.UPDATE.FAIL";
    payload: {message: string; isForceable: boolean};
  };
  "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER": {
    type: "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER";
  };
};
