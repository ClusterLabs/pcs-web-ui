import {
  ApiOrderKind,
  ApiConstraintAction,
} from "app/common/backend/types/clusterStatus";

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

type ConstraintColocationBase = {
  id: string;
  score?: Score;
}

export type ConstraintColocation = ConstraintColocationBase & {
  type: "COLOCATION";
  firstResource: ColocationResource;
  secondResource: ColocationResource;
  nodeAttribute?: string;
};

export type ConstraintColocationSet = ConstraintColocationBase & {
  type: "COLOCATION.SET";
  sets: ResourceSet[];
};

type OrderResource = {
  id: string;
  action?: ApiConstraintAction;
  instance?: number;
}

type ConstraintOrderBase = {
  id: string;
  symmetrical?: boolean;
  requireAll?: boolean;
} & (
  | { score?: Score }
  | { kind?: ApiOrderKind }
)

export type ConstraintOrder = ConstraintOrderBase & {
  type: "ORDER";
  firstResource: OrderResource;
  thenResource: OrderResource;
}

export type ConstraintOrderSet = ConstraintOrderBase & {
  type: "ORDER.SET";
  sets: ResourceSet[];
}

export type Constraint = (
  |ConstraintLocation
  |ConstraintLocationRule
  |ConstraintLocationRuleRef
  |ConstraintColocation
  |ConstraintColocationSet
  |ConstraintOrder
  |ConstraintOrderSet
);
