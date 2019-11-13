/* eslint-disable camelcase */
import * as t from "io-ts";

/*
datasource:/cib/configuration/constraints
TODO add attributes according .rng. (to ApiLocation, ApiResourceAttributes, ...)
warning: there are relations between attributes - things will be more
complicated!
*/

const ApiLocationBase = t.type({
  rule_string: t.string,
  "rsc-pattern": t.string,
  rsc: t.string,
});

const ApiLocationRef = t.intersection([ApiLocationBase, t.type({
  "id-ref": t.string,
})]);

const ApiLocation = t.intersection([ApiLocationBase, t.type({
  id: t.string,
  score: t.union([t.number, t.keyof({ INFINITY: null, "-INFINITY": null })]),
})]);

const ApiResourceSetAttributes = t.record(t.string, t.string);

const ApiResourceSet = t.type({
  id: t.string,
  resources: t.array(t.string),
});

const ApiConstraintSet = t.type({
  sets: t.array(t.intersection([ApiResourceSet, ApiResourceSetAttributes])),
});

const ApiConstraintAttributes = t.record(t.string, t.string);

export const ApiConstraints = t.type({
  rsc_location: t.array(t.union([ApiLocationRef, ApiLocation])),
  rsc_colocation: t.array(
    t.union([ApiConstraintSet, ApiConstraintAttributes]),
  ),
  rsc_order: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
  rsc_ticket: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
});
