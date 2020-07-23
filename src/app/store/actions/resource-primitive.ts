export type PrimitiveResourceActions = {
  CreateResource: {
    type: "RESOURCE.PRIMITIVE.CREATE";
    payload: {
      clusterUrlName: string;
      resourceName: string;
      agentName: string;
    };
  };
  CreateResourceSuccess: {
    type: "RESOURCE.PRIMITIVE.CREATE.SUCCESS";
    payload: {
      clusterUrlName: string;
      resourceName: string;
    };
  };
  CreateResourceFailed: {
    type: "RESOURCE.PRIMITIVE.CREATE.FAILED";
    payload: {
      clusterUrlName: string;
      resourceName: string;
    };
  };

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
