export type ColocationCreateActions = {
  "CONSTRAINT.COLOCATION.CREATE.INIT": {
    type: "CONSTRAINT.COLOCATION.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
    };
  };
  "CONSTRAINT.COLOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.COLOCATION.CREATE.UPDATE";
    key: {clusterName: string};
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
    key: {clusterName: string};
  };
};
