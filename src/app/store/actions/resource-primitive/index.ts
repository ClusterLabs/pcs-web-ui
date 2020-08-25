import * as create from "./create";

export type PrimitiveResourceActions = {
  CreateResource: create.CreateResource;
  CreateResourceSuccess: create.CreateResourceSuccess;
  CreateResourceFailed: create.CreateResourceFailed;
  CreateResourceError: create.CreateResourceError;
  CreateResourceSetAgentName: create.SetAgentName;
  CreateResourceSetResourceName: create.SetResourceName;
  CreateResourceClose: create.Close;
  CreateResourceSetInstanceAttribute: create.SetInstanceAttribute;
  CreateResourceValidationShow: create.ValidationShow;
  CreateResourceValidationHide: create.ValidationHide;

  UpdateInstanceAttributes: {
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES";
    payload: {
      clusterUrlName: string;
      resourceId: string;
      attributes: Record<string, string>;
    };
  };

  UpdateInstanceAttributesSuccess: {
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.SUCCESS";
  };

  UpdateInstanceAttributesFailed: {
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.FAILED";
  };
};
