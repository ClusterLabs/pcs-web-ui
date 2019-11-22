type Score = "INFINITY"|"-INFINITY"|number;
type Role = "Stopped"|"Started"|"Master"|"Slave";

type ConstraintLocation = (
  {
    type: "LOCATION";
    id: string;
  }
  & (
    | { rule: string; }
    | { score: Score; node: string; }
  )
)

export type Constraint = ConstraintLocation;
