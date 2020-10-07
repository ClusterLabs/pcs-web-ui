import * as create from "./create";

export type PrimitiveResourceActions = {
  CreateResource: create.CreateResource;
  CreateResourceSuccess: create.CreateResourceSuccess;
  CreateResourceFailed: create.CreateResourceFailed;
  CreateResourceError: create.CreateResourceError;
  CreateResourceClose: create.Close;
  CreateResourceValidationShow: create.ValidationShow;
  CreateResourceValidationHide: create.ValidationHide;
  CreateResourceUpdate: create.Update;

  UpdateInstanceAttributes: {
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES";
    payload: {
      clusterUrlName: string;
      resourceId: string;
      attributes: Record<string, string>;
    };
  };

  ActionRefresh: {
    type: "RESOURCE.PRIMITIVE.REFRESH";
    payload: {
      clusterUrlName: string;
      resourceId: string;
    };
  };

  ActionCleanup: {
    type: "RESOURCE.PRIMITIVE.CLEANUP";
    payload: {
      clusterUrlName: string;
      resourceId: string;
    };
  };

  ActionDelete: {
    type: "RESOURCE.PRIMITIVE.DELETE";
    payload: {
      clusterUrlName: string;
      resourceIds: string[];
    };
  };
};
