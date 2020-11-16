import { ResourceCreateActions } from "./create";
import { ResourceTreeActions } from "./tree";

export type ResourceActions = ResourceCreateActions &
  ResourceTreeActions & {
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
      };
    };
  };
