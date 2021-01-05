export type ResourceActionsActions = {
  "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES": {
    type: "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES";
    key: { clusterName: string };
    payload: {
      resourceId: string;
      attributes: Record<string, string>;
    };
  };

  "RESOURCE.REFRESH": {
    type: "RESOURCE.REFRESH";
    key: { clusterName: string };
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLEANUP": {
    type: "RESOURCE.CLEANUP";
    key: { clusterName: string };
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.DELETE": {
    type: "RESOURCE.DELETE";
    key: { clusterName: string };
    payload: {
      resourceIds: string[];
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLONE": {
    type: "RESOURCE.CLONE";
    key: { clusterName: string };
    payload: {
      resourceId: string;
    };
  };

  "RESOURCE.UNCLONE": {
    type: "RESOURCE.UNCLONE";
    key: { clusterName: string };
    payload: {
      resourceId: string;
    };
  };
};
