import {
  ApiConstraintAction,
  ApiConstraintOrderKind,
  ApiConstraintRole,
  ApiScore,
} from "app/common/backend/types/clusterStatus";

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
    value: ApiScore;
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
  role?: ApiConstraintRole;
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
  role?: ApiConstraintRole;
  score?: ApiScore;
  resourceIdList: string[];
}

export type ConstraintLocation = ConstraintLocationBase & {
  type: "LOCATION";
  score: ApiScore;
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
  score?: ApiScore;
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
  | { score?: ApiScore }
  | { kind?: ApiConstraintOrderKind }
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
