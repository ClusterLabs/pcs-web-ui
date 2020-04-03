import * as t from "io-ts";

import { ApiId, ApiResourceId, ApiScore } from "./common";

const ApiConstraintRole = t.keyof({
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

const ApiConstraintOrderKind = t.keyof({
  Optional: null,
  Mandatory: null,
  Serialize: null,
});

const ApiConstraintIdReference = t.type({ "id-ref": ApiId });

const ApiConstraintTicketLossPolicy = t.keyof({
  stop: null,
  demote: null,
  fence: null,
  freeze: null,
});

const ApiConstraintResourceSetOrdering = t.keyof({
  group: null,
  listed: null,
});

export const ApiConstraintResourceSet = t.union([
  ApiConstraintIdReference,
  t.intersection([
    t.type({
      id: ApiId,
      resources: t.array(ApiResourceId),
    }),
    t.partial({
      sequential: t.boolean,
      "require-all": t.boolean,
      ordering: ApiConstraintResourceSetOrdering,
      action: ApiConstraintAction,
      role: ApiConstraintRole,
      score: ApiScore,
    }),
  ]),
]);

/*
It is not the full common rule. It is just shortened version which attributes
are mixed into location constraint in the backend.
*/
const ApiConstraintLocationRule = t.intersection([
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
export const ApiConstraintLocation = t.intersection([
  t.type({ id: ApiId }),
  t.union([
    t.type({ rsc: t.union([t.string, t.null]) }),
    t.type({ "rsc-pattern": t.string }),
  ]),
  t.union([
    t.intersection([
      t.type({ rule_string: t.string }),
      t.union([ApiConstraintLocationRule, ApiConstraintIdReference]),
    ]),
    t.type({
      node: t.string,
      score: ApiScore,
    }),
  ]),
  t.partial({
    role: ApiConstraintRole,
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
export const ApiConstraintColocation = t.intersection([
  t.type({ id: ApiId }),
  t.partial({ score: ApiScore }),
  t.union([
    t.type({ sets: t.array(ApiConstraintResourceSet) }),
    t.intersection([
      t.type({ rsc: t.string, "with-rsc": t.string }),
      t.partial({
        "node-attribute": t.string,
        "rsc-role": ApiConstraintRole,
        "with-rsc-role": ApiConstraintRole,
        "rsc-instance": t.number,
        "with-rsc-instance": t.number,
      }),
    ]),
  ]),
]);

export const ApiConstraintOrder = t.intersection([
  t.type({ id: ApiId }),
  t.partial({
    symmetrical: t.boolean,
    "require-all": t.boolean,
  }),
  t.union([
    t.partial({ score: ApiScore }),
    t.partial({ kind: ApiConstraintOrderKind }),
  ]),
  t.union([
    t.type({ sets: t.array(ApiConstraintResourceSet) }),
    t.intersection([
      t.type({
        first: ApiId,
        then: ApiId,
      }),
      t.partial({
        "first-action": ApiConstraintAction,
        "then-action": ApiConstraintAction,
        "first-instance": t.number,
        "then-instance": t.number,
      }),
    ]),
  ]),
]);

export const ApiConstraintTicket = t.intersection([
  t.type({
    id: ApiId,
    ticket: t.string,
  }),
  t.union([
    t.type({ sets: t.array(ApiConstraintResourceSet) }),
    t.intersection([
      t.type({ rsc: t.string }),
      t.partial({ "rsc-role": ApiConstraintRole }),
    ]),
  ]),
  t.partial({ "loss-policy": ApiConstraintTicketLossPolicy }),
]);

export const ApiConstraints = t.partial({
  rsc_location: t.array(ApiConstraintLocation),
  rsc_colocation: t.array(ApiConstraintColocation),
  rsc_order: t.array(ApiConstraintOrder),
  rsc_ticket: t.array(ApiConstraintTicket),
});
