export type ResourceDeleteActions = {
  "RESOURCE.DELETE.INIT": {
    type: "RESOURCE.DELETE.INIT";
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
      force: boolean;
    };
  };
  "RESOURCE.DELETE.OK": {
    type: "RESOURCE.DELETE.OK";
  };

  "RESOURCE.DELETE.FAIL": {
    type: "RESOURCE.DELETE.FAIL";
    payload: {
      message: string;
      isForceable: boolean;
    };
  };

  "RESOURCE.DELETE.CLOSE": {
    type: "RESOURCE.DELETE.CLOSE";
  };
};
