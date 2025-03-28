export type ResourceDeleteActions = {
  "RESOURCE.DELETE.INIT": {
    type: "RESOURCE.DELETE.INIT";
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
      force: boolean;
    };
  };
  "RESOURCE.DELETE.OK": {
    type: "RESOURCE.DELETE.OK";
    key: {clusterName: string};
  };

  "RESOURCE.DELETE.FAIL": {
    type: "RESOURCE.DELETE.FAIL";
    key: {clusterName: string};
    payload: {
      message: string;
      isForceable: boolean;
    };
  };

  "RESOURCE.DELETE.CLOSE": {
    type: "RESOURCE.DELETE.CLOSE";
    key: {clusterName: string};
  };
};
