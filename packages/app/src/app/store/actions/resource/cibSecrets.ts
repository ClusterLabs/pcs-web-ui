export type CibSecretsActions = {
  "RESOURCE.CIB_SECRETS.LOAD": {
    type: "RESOURCE.CIB_SECRETS.LOAD";
    key: {clusterName: string};
    payload: {
      resourceId: string;
      attributeNames: string[];
    };
  };

  "RESOURCE.CIB_SECRETS.LOAD.SUCCESS": {
    type: "RESOURCE.CIB_SECRETS.LOAD.SUCCESS";
    key: {clusterName: string};
    payload: {
      resource_secrets: {resource_id: string; name: string; value: string}[];
    };
  };

  "RESOURCE.CIB_SECRETS.LOAD.FAILED": {
    type: "RESOURCE.CIB_SECRETS.LOAD.FAILED";
    key: {clusterName: string};
    payload: {resourceId: string};
  };

  "RESOURCE.CIB_SECRETS.CLEAR": {
    type: "RESOURCE.CIB_SECRETS.CLEAR";
    key: {clusterName: string};
    payload: {resourceId: string};
  };
};
