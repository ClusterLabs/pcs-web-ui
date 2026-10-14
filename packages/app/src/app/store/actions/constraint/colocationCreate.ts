export type ColocationCreateActions = {
  "CONSTRAINT.COLOCATION.CREATE.INIT": {
    type: "CONSTRAINT.COLOCATION.CREATE.INIT";
    payload: {
      clusterName: string;
      resourceIdList: string[];
    };
  };
  "CONSTRAINT.COLOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.COLOCATION.CREATE.UPDATE";
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
  };
};
