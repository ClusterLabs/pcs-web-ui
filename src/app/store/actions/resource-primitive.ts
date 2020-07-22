export type PrimitiveResourceActions = {
  CreateResource: {
    type: "RESOURCE.PRIMITIVE.CREATE";
    payload: {
      resourceName: string;
      agentName: string;
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
