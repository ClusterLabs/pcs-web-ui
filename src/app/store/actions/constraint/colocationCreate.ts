export type ColocationCreateActions = {
  "CONSTRAINT.COLOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.COLOCATION.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      resourceSpecification?: "existing" | "new";
      placement?: "together" | "apart";
      resourceId?: string;
      withResourceId?: string;
      score?: string;
    };
  };

  "CONSTRAINT.COLOCATION.CREATE.CLOSE": {
    type: "CONSTRAINT.COLOCATION.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
