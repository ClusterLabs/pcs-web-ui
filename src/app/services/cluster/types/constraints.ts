type Score = "INFINITY"|"-INFINITY"|number;
type Role = "Stopped"|"Started"|"Master"|"Slave";

export type ResourceRelation = (
  {
    type: "RESOURCE-ID"|"PATTERN";
    value: string;
  } | {
    type: "UNKNOWN";
    value: null;
  }
);

type Location = {
  type: "LOCATION";
  resourceRelation: ResourceRelation;
  id: string;
  score: Score;
  node: string;
}

type LocationRule = {
  type: "LOCATION-RULE";
  resourceRelation: ResourceRelation;
  id: string;
  ruleString: string;
}

export type Constraint = Location|LocationRule;
