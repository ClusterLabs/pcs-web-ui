/* eslint-disable camelcase */
/*
datasource:/cib/configuration/constraints
TODO add attributes according .rng. (to ApiLocation, ApiResourceAttributes, ...)
warning: there are relations between attributes - things will be more
complicated!
*/
interface ApiLocationBase {
  rule_string: string;
  "rsc-pattern": string;
  rsc: string;
}

interface ApiLocationRef extends ApiLocationBase{
  "id-ref": string;
}

interface ApiLocation extends ApiLocationBase{
  id: string;
  score: number|"INFINITY"|"-INFINITY";
}

interface ApiResourceSetAttributes {
  [resource_set_attribute: string]: string;
}

interface ApiResourceSet {
  id: string;
  resources: string[];
}

interface ApiConstraintSet {
  sets: (ApiResourceSet & ApiResourceSetAttributes)[];
}

interface ApiConstraintAttributes {
  [constraint_attribute: string]: string;
}

export interface ApiConstraints {
  rsc_location: (ApiLocationRef|ApiLocation)[];
  rsc_colocation: (ApiConstraintSet|ApiConstraintAttributes)[];
  rsc_order: (ApiConstraintSet|ApiConstraintAttributes)[];
  rsc_ticket: (ApiConstraintSet|ApiConstraintAttributes)[];
}
