/* eslint-disable camelcase */
import * as t from "io-ts";

/*
datasource:/cib/configuration/constraints
TODO add attributes according .rng. (to ApiLocation, ApiResourceAttributes, ...)
warning: there are relations between attributes - things will be more
complicated!
*/

const ApiRole = t.keyof({
  Stopped: null,
  Started: null,
  Master: null,
  Slave: null,
});

/*
rule_string is always present. It does not follow rng schema, however the ruby
  backend does it that way.
*/
const ApiLocation = t.intersection([
  t.type({
    id: t.string,
    rule_string: t.string,
  }),
  t.union([
    t.type({ rsc: t.string }),
    t.type({ "rsc-pattern": t.string }),
  ]),
  t.union([
    t.type({ "id-ref": t.string }),
    t.type({
      node: t.string,
      score: t.union([
        t.number,
        t.keyof({ INFINITY: null, "-INFINITY": null }),
      ]),
    }),
  ]),
  t.partial({
    role: ApiRole,
    "resource-discovery": t.keyof({
      always: null,
      never: null,
      exclusive: null,
    }),
  }),
]);

/*
In backend sets inside locations are ignored. Location constraint with resource
set ends up with "rsc" equals to null.
*/
const ApiLocationSet = t.type({ rsc: t.null });


const ApiResourceSetAttributes = t.record(t.string, t.string);

const ApiResourceSet = t.type({
  id: t.string,
  resources: t.array(t.string),
});

const ApiConstraintSet = t.type({
  sets: t.array(t.intersection([ApiResourceSet, ApiResourceSetAttributes])),
});

const ApiConstraintAttributes = t.record(t.string, t.string);

export const ApiConstraints = t.partial({
  rsc_location: t.array(t.union([
    ApiLocation,
    ApiConstraintAttributes, // when no rules, no sets there
    ApiLocationSet,
  ])),
  rsc_colocation: t.array(
    t.union([ApiConstraintSet, ApiConstraintAttributes]),
  ),
  rsc_order: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
  rsc_ticket: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
});
