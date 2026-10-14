export type ConstraintDeleteActions = {
  "CONSTRAINT.DELETE": {
    type: "CONSTRAINT.DELETE";
    payload: {
      constraintId: string;
    };
  };

  "CONSTRAINT.DELETE.RULE": {
    type: "CONSTRAINT.DELETE.RULE";
    payload: {
      ruleId: string;
    };
  };
};
