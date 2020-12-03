export type ResourceActionsActions = {
  "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES": {
    type: "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES";
    payload: {
      clusterUrlName: string;
      resourceId: string;
      attributes: Record<string, string>;
    };
  };

  "RESOURCE.REFRESH": {
    type: "RESOURCE.REFRESH";
    payload: {
      clusterUrlName: string;
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLEANUP": {
    type: "RESOURCE.CLEANUP";
    payload: {
      clusterUrlName: string;
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.DELETE": {
    type: "RESOURCE.DELETE";
    payload: {
      clusterUrlName: string;
      resourceIds: string[];
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLONE": {
    type: "RESOURCE.CLONE";
    payload: {
      clusterUrlName: string;
      resourceId: string;
    };
  };

  "RESOURCE.UNCLONE": {
    type: "RESOURCE.UNCLONE";
    payload: {
      clusterUrlName: string;
      resourceId: string;
    };
  };
};
