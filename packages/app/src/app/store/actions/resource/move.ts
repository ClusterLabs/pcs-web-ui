export type ResourceMoveActions = {
  "RESOURCE.MOVE.OPEN": {
    type: "RESOURCE.MOVE.OPEN";
    payload: {
      clusterName: string;
      resourceId: string;
      resourceType: "primitive resource" | "group" | "clone";
      nodeNameList: string[];
    };
  };

  "RESOURCE.MOVE.CLOSE": {
    type: "RESOURCE.MOVE.CLOSE";
  };

  "RESOURCE.MOVE.UPDATE": {
    type: "RESOURCE.MOVE.UPDATE";
    payload: {
      useNode?: boolean;
      node?: string;
      constraintHandling?: "autoclean" | "keep" | "expire";
      constraintLifetime?: string;
      strictMode?: boolean;
    };
  };
};
