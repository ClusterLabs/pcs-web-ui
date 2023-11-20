export type ResourceMoveActions = {
  "RESOURCE.MOVE.OPEN": {
    type: "RESOURCE.MOVE.OPEN";
    payload: {
      clusterName: string;
      resourceId: string;

      nodeNameList: string[];
    } & (
      | {resourceType: "primitive resource" | "group"}
      | {resourceType: "clone"; isPromotable: boolean}
    );
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
      limitToPromoted?: boolean;
    };
  };
};
