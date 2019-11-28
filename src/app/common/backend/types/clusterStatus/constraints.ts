/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiId, ApiResourceId } from "./common";

const ApiScore = t.union([
  t.number,
  t.keyof({ INFINITY: null, "-INFINITY": null }),
]);

const ApiRole = t.keyof({
  Stopped: null,
  Started: null,
  Master: null,
  Slave: null,
});

const ApiConstraintAction = t.keyof({
  start: null,
  promote: null,
  demote: null,
  stop: null,
});

export const ApiReference = t.type({ "id-ref": ApiId });

export const ApiResourceSet = t.union([
  ApiReference,
  t.intersection([
    t.type({
      id: ApiId,
      resources: t.array(ApiResourceId),
    }),
    t.partial({
      sequential: t.boolean,
      "require-all": t.boolean,
      ordering: t.keyof({
        group: null,
        listed: null,
      }),
      action: ApiConstraintAction,
      role: ApiRole,
      score: ApiScore,
    }),
  ]),
]);


/*
It is not the full common rule. It is just shortened version which attributes
are mixed into location constraint in the backend.
*/
export const ApiLocationRule = t.intersection([
  t.type({ id: ApiId }),
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
  t.type({ id: ApiId }),
  t.union([
    t.type({ rsc: t.union([t.string, t.null]) }),
    t.type({ "rsc-pattern": t.string }),
  ]),
  t.union([
    t.intersection([
      t.type({ rule_string: t.string }),
      t.union([ApiLocationRule, ApiReference]),
    ]),
    t.type({
      node: t.string,
      score: ApiScore,
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
The element lifetime with rules is not currently present in the backend
response.
*/
export const ApiColocation = t.intersection([
  t.type({ id: ApiId }),
  t.partial({ score: ApiScore }),
  t.union([
    t.type({ sets: t.array(ApiResourceSet) }),
    t.intersection([
      t.type({ rsc: t.string, "with-rsc": t.string }),
      t.partial({
        "node-attribute": t.string,
        "rsc-role": ApiRole,
        "with-rsc-role": ApiRole,
        "rsc-instance": t.number,
        "with-rsc-instance": t.number,
      }),
    ]),
  ]),
]);

/*
There are remaining resource set attributes besides the "sets" attribute.
*/
const ApiConstraintSet = t.type({
  sets: t.array(t.intersection([
    t.type({
      id: ApiId,
      resources: t.array(t.string),
    }),
    t.record(t.string, t.string),
  ])),
});

const ApiConstraintAttributes = t.record(t.string, t.string);

export const ApiConstraints = t.partial({
  rsc_location: t.array(ApiLocation),
  rsc_colocation: t.array(ApiColocation),
  rsc_order: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
  rsc_ticket: t.array(t.union([ApiConstraintSet, ApiConstraintAttributes])),
});
