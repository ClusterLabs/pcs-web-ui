export type CibSecretsActions = {
  "RESOURCE.CIB_SECRETS.LOAD": {
    type: "RESOURCE.CIB_SECRETS.LOAD";
    payload: {
      resourceId: string;
      attributeNames: string[];
    };
  };

  "RESOURCE.CIB_SECRETS.LOAD.SUCCESS": {
    type: "RESOURCE.CIB_SECRETS.LOAD.SUCCESS";
    payload: {
      resource_secrets: {resource_id: string; name: string; value: string}[];
    };
  };

  "RESOURCE.CIB_SECRETS.LOAD.FAILED": {
    type: "RESOURCE.CIB_SECRETS.LOAD.FAILED";
    payload: {resourceId: string};
  };

  "RESOURCE.CIB_SECRETS.CLEAR": {
    type: "RESOURCE.CIB_SECRETS.CLEAR";
    payload: {resourceId: string};
  };
};
