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

const ApiConstraintLocationRscDiscovery = t.keyof({
  always: null,
  never: null,
  exclusive: null,
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
      // sequential and require-all should be booleans, however, strings come
      // from backend
      sequential: t.string,
      "require-all": t.string,
      ordering: ApiConstraintResourceSetOrdering,
      action: ApiConstraintAction,
      role: ApiConstraintRole,
      score: ApiScore,
    }),
  ]),
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
Id is:
  - id of constraint
    - in ApiConstraintLocationNode
    - in ApiConstraintLocationRule with id-ref
  - id of rule
    - in ApiConstraintLocationRule with score or score attribute (i.e. without
      id-ref)
*/
const ApiConstraintLocation = t.intersection([
  t.type({ id: ApiId }),
  t.union([
    t.type({ rsc: t.union([t.string, t.null]) }),
    t.type({ "rsc-pattern": t.string }),
  ]),
  t.partial({
    role: ApiConstraintRole,
    "resource-discovery": ApiConstraintLocationRscDiscovery,
  }),
]);

export const ApiConstraintLocationNode = t.intersection([
  ApiConstraintLocation,
  t.type({
    node: t.string,
    score: ApiScore,
  }),
]);

/*
It is not the full common rule. It is just shortened version which attributes
are mixed into location constraint in the backend.
*/
export const ApiConstraintLocationRule = t.intersection([
  ApiConstraintLocation,
  t.type({ rule_string: t.string }),
  t.union([
    ApiConstraintIdReference,
    t.intersection([
      t.union([
        t.type({ score: ApiScore }),
        t.type({ "score-attribute": t.string }),
      ]),
      t.partial({ role: t.string }),
    ]),
  ]),
]);

/*
The element lifetime with rules is not currently present in the backend
response.
*/
const ApiConstraintColocation = t.intersection([
  t.type({ id: ApiId }),
  t.partial({ score: ApiScore }),
]);

export const ApiConstraintColocationPair = t.intersection([
  ApiConstraintColocation,
  t.type({
    rsc: t.string,
    "with-rsc": t.string,
  }),
  t.partial({
    "node-attribute": t.string,
    "rsc-role": ApiConstraintRole,
    "with-rsc-role": ApiConstraintRole,
    "rsc-instance": t.number,
    "with-rsc-instance": t.number,
  }),
]);

export const ApiConstraintColocationSet = t.intersection([
  ApiConstraintColocation,
  t.type({ sets: t.array(ApiConstraintResourceSet) }),
]);

export const ApiConstraintOrder = t.intersection([
  t.type({ id: ApiId }),
  t.partial({
    // symmetrical and require-all should be booleans, however, strings come
    // from backend
    symmetrical: t.string,
    "require-all": t.string,
  }),
  t.union([
    t.partial({ score: ApiScore }),
    t.partial({ kind: ApiConstraintOrderKind }),
  ]),
]);

export const ApiConstraintOrderSet = t.intersection([
  ApiConstraintOrder,
  t.type({
    sets: t.array(ApiConstraintResourceSet),
  }),
]);

export const ApiConstraintOrderPair = t.intersection([
  ApiConstraintOrder,
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
]);

export const ApiConstraintTicket = t.intersection([
  t.type({
    id: ApiId,
    ticket: t.string,
  }),
  t.partial({ "loss-policy": ApiConstraintTicketLossPolicy }),
]);

export const ApiConstraintTicketResource = t.intersection([
  ApiConstraintTicket,
  t.type({ rsc: t.string }),
  t.partial({ "rsc-role": ApiConstraintRole }),
]);

export const ApiConstraintTicketSet = t.intersection([
  ApiConstraintTicket,
  t.type({ sets: t.array(ApiConstraintResourceSet) }),
]);

export const ApiConstraints = t.partial({
  rsc_location: t.array(
    t.union([ApiConstraintLocationNode, ApiConstraintLocationRule]),
  ),
  rsc_colocation: t.array(
    t.union([ApiConstraintColocationPair, ApiConstraintColocationSet]),
  ),
  rsc_order: t.array(t.union([ApiConstraintOrderPair, ApiConstraintOrderSet])),
  rsc_ticket: t.array(
    t.union([ApiConstraintTicketResource, ApiConstraintTicketSet]),
  ),
});
