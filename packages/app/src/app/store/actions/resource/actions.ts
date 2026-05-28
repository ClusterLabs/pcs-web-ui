export type ResourceActionsActions = {
  "RESOURCE.REFRESH": {
    type: "RESOURCE.REFRESH";
    key: {clusterName: string};
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLEANUP": {
    type: "RESOURCE.CLEANUP";
    key: {clusterName: string};
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.DELETE": {
    type: "RESOURCE.DELETE";
    key: {clusterName: string};
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLONE": {
    type: "RESOURCE.CLONE";
    key: {clusterName: string};
    payload: {
      resourceId: string;
    };
  };

  "RESOURCE.UNCLONE": {
    type: "RESOURCE.UNCLONE";
    key: {clusterName: string};
    payload: {
      resourceId: string;
    };
  };
};
