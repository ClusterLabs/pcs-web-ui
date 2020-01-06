import { getResourceAgentMetadata, ApiResponse } from "app/backend";

export type PrimitiveResourceActions = {
  LoadResourceAgent: {
    type: "RESOURCE_AGENT.LOAD";
    payload: {
      agentName: string;
      clusterUrlName: string;
    };
  };

  LoadResourceAgentSuccess: {
    type: "RESOURCE_AGENT.LOAD.SUCCESS";
    payload: {
      apiAgentMetadata: ApiResponse<typeof getResourceAgentMetadata>;
    }
  };

  LoadResourceAgentFailed: {
    type: "RESOURCE_AGENT.LOAD.FAILED";
    payload: {
      agentName: string;
    }
  };

  UpdateInstanceAttributes: {
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES";
    payload: {
      clusterUrlName: string;
      resourceId: string;
      attributes: Record<string, string>;
    }
  }

  UpdateInstanceAttributesSuccess: {
    type: "RESOURCE.PRIMITIVE.UPDATE_INSTANCE_ATTRIBUTES.SUCCESS";
  }
}
