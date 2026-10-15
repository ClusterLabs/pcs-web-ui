export type ResourceActionsActions = {
  "RESOURCE.REFRESH": {
    type: "RESOURCE.REFRESH";
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLEANUP": {
    type: "RESOURCE.CLEANUP";
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.DELETE": {
    type: "RESOURCE.DELETE";
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLONE": {
    type: "RESOURCE.CLONE";
    payload: {
      resourceId: string;
    };
  };

  "RESOURCE.UNCLONE": {
    type: "RESOURCE.UNCLONE";
    payload: {
      resourceId: string;
    };
  };
};
