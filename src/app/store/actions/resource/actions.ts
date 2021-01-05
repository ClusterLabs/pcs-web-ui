export type ResourceActionsActions = {
  "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES": {
    type: "RESOURCE.UPDATE_INSTANCE_ATTRIBUTES";
    id: { cluster: string };
    payload: {
      resourceId: string;
      attributes: Record<string, string>;
    };
  };

  "RESOURCE.REFRESH": {
    type: "RESOURCE.REFRESH";
    id: { cluster: string };
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLEANUP": {
    type: "RESOURCE.CLEANUP";
    id: { cluster: string };
    payload: {
      resourceId: string;
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.DELETE": {
    type: "RESOURCE.DELETE";
    id: { cluster: string };
    payload: {
      resourceIds: string[];
      resourceType: "resource" | "fence-device";
    };
  };

  "RESOURCE.CLONE": {
    type: "RESOURCE.CLONE";
    id: { cluster: string };
    payload: {
      resourceId: string;
    };
  };

  "RESOURCE.UNCLONE": {
    type: "RESOURCE.UNCLONE";
    id: { cluster: string };
    payload: {
      resourceId: string;
    };
  };
};
