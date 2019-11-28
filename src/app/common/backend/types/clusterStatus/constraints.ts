/* eslint-disable camelcase */
import * as t from "io-ts";

const ApiScore = t.union([
  t.number,
  t.keyof({ INFINITY: null, "-INFINITY": null }),
]);

/*
It is not the full common rule. It is just shortened version which attributes
are mixed into location constraint in the backend.
*/
export const ApiLocationRuleReference = t.type({ "id-ref": t.string });
export const ApiLocationRule = t.intersection([
  t.type({ id: t.string }),
  t.union([
    t.type({ score: ApiScore }),
    t.type({ "score-attribute": t.string }),
  ]),
  t.partial({ role: t.string }),
]);

/*
datasource:/cib/configuration/constraints
TODO add attributes according .rng. (to ApiLocation, ApiResourceAttributes, ...)
warning: there are relations between attributes - things will be more
complicated!
*/


/*
rule_string does not follow rng schema, however the ruby backend does it that
way.
In backend sets inside locations are ignored. Location constraint with resource
set ends up with "rsc" equals to null.
*/
export const ApiLocation = t.intersection([
  t.type({
    id: t.string,
  }),
  t.union([
    t.type({ rsc: t.union([t.string, t.null]) }),
    t.type({ "rsc-pattern": t.string }),
  ]),
  t.union([
    t.intersection([
      t.type({ rule_string: t.string }),
      t.union([ApiLocationRule, ApiLocationRuleReference]),
    ]),
    t.type({
      node: t.string,
      score: ApiScore,
    }),
  ]),
  t.partial({
    role: t.keyof({
      Stopped: null,
      Started: null,
      Master: null,
      Slave: null,
    }),
    "resource-discovery": t.keyof({
      always: null,
      never: null,
      exclusive: null,
    }),
  }),
]);

/*
There are remaining resource set attributes besides the "sets" attribute.
*/
const ApiConstraintSet = t.type({
  sets: t.array(t.intersection([
    t.type({
      id: t.string,
      resources: t.array(t.string),
    }),
    t.record(t.string, t.string),
  ])),
});

const ApiConstraintAttributes = t.record(t.string, t.string);

export const ApiConstraints = t.partial({
  rsc_location: t.array(ApiLocation),
  rsc_colocation: t.array(
    t.union([ApiConstraintSet, ApiConstraintAttributes]),
  ),
  rsc_order: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
  rsc_ticket: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
});
