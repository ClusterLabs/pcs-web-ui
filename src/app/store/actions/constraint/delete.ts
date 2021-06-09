export type ConstraintDeleteActions = {
  "CONSTRAINT.DELETE": {
    type: "CONSTRAINT.DELETE";
    key: { clusterName: string };
    payload: {
      constraintId: string;
    };
  };

  "CONSTRAINT.DELETE.RULE": {
    type: "CONSTRAINT.DELETE.RULE";
    key: { clusterName: string };
    payload: {
      ruleId: string;
    };
  };
};
