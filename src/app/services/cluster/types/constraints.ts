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
    type: "SCORE.ATTRIBUTE";
    value: string;
  }
)

type ConstraintLocationBase = {
  resourceRelation: ResourceRelation;
  id: string;
}

type ColocationResource = {
  id: string;
  role?: Role;
  instance?: number;
}

type Reference = { referenceId: string; }

type ConstraintAction = "start"|"promote"|"demote"|"stop"

export type ResourceSet = Reference | {
  id: string;
  sequential?: boolean;
  requireAll?: boolean;
  ordering?: "group"|"listed";
  action?: ConstraintAction;
  role?: Role;
  score?: Score;
  resourceIdList: string[];
}

export type ConstraintLocation = ConstraintLocationBase & {
  type: "LOCATION";
  score: Score;
  node: string;
}

export type ConstraintLocationRule = ConstraintLocationBase & {
  type: "LOCATION.RULE";
  ruleString: string;
  ruleScore: RuleScore;
}

export type ConstraintLocationRuleRef = ConstraintLocationBase & {
  type: "LOCATION.RULE.REFERENCE";
  referencedRuleId: string;
}

export type ConstraintColocation = {
  type: "COLOCATION";
  id: string;
  firstResource: ColocationResource;
  secondResource: ColocationResource;
  score?: Score;
  nodeAttribute?: string;
};

export type ConstraintColocationSet = {
  type: "COLOCATION.SET";
  id: string;
  sets: ResourceSet[];
  score?: Score;
};


export type Constraint = (
  |ConstraintLocation
  |ConstraintLocationRule
  |ConstraintLocationRuleRef
  |ConstraintColocation
  |ConstraintColocationSet
);
