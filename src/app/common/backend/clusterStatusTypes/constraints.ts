/* eslint-disable camelcase */
import * as t from "io-ts";

/*
datasource:/cib/configuration/constraints
TODO add attributes according .rng. (to ApiLocation, ApiResourceAttributes, ...)
warning: there are relations between attributes - things will be more
complicated!
*/

const TApiLocationBase = t.type({
  rule_string: t.string,
  "rsc-pattern": t.string,
  rsc: t.string,
});

const TApiLocationRef = t.intersection([TApiLocationBase, t.type({
  "id-ref": t.string,
})]);

const TApiLocation = t.intersection([TApiLocationBase, t.type({
  id: t.string,
  score: t.union([t.number, t.keyof({ INFINITY: null, "-INFINITY": null })]),
})]);

const TApiResourceSetAttributes = t.record(t.string, t.string);

const TApiResourceSet = t.type({
  id: t.string,
  resources: t.array(t.string),
});

const TApiConstraintSet = t.type({
  sets: t.array(t.intersection([TApiResourceSet, TApiResourceSetAttributes])),
});

const TApiConstraintAttributes = t.record(t.string, t.string);

export const TApiConstraints = t.type({
  rsc_location: t.array(t.union([TApiLocationRef, TApiLocation])),
  rsc_colocation: t.array(
    t.union([TApiConstraintSet, TApiConstraintAttributes]),
  ),
  rsc_order: t.array(t.union([TApiConstraintSet, TApiConstraintAttributes])),
  rsc_ticket: t.array(t.union([TApiConstraintSet, TApiConstraintAttributes])),
});
