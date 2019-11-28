type Score = "INFINITY"|"-INFINITY"|number;
type Role = "Stopped"|"Started"|"Master"|"Slave";

export type ResourceRelation = (
  |{
    type: "RESOURCE-ID"|"PATTERN";
    value: string;
  }
  |{
    type: "UNKNOWN";
    value: null;
  }
)

export type RuleScore = (
  |{
    type: "SCORE";
    value: Score;
  }
  |{
    type: "SCORE-ATTRIBUTE";
    value: string;
  }
)

type ConstraintLocationBase = {
  resourceRelation: ResourceRelation;
  id: string;
}

export type ConstraintLocation = ConstraintLocationBase & {
  type: "LOCATION";
  score: Score;
  node: string;
}

export type ConstraintLocationRule = ConstraintLocationBase & {
  type: "LOCATION-RULE";
  ruleString: string;
  ruleScore: RuleScore;
}

export type ConstraintLocationRuleRef = ConstraintLocationBase & {
  type: "LOCATION-RULE-REFERENCE";
  referencedRuleId: string;
}

export type Constraint = (
  |ConstraintLocation
  |ConstraintLocationRule
  |ConstraintLocationRuleRef
);
