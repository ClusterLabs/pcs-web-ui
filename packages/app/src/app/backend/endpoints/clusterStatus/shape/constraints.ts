import * as t from "io-ts";

import {ApiId, ApiResourceId} from "./common";

const ApiScore = t.union([
  // t.number,
  // type number is correct, however from backend it comes as a string
  t.string,
  t.keyof({INFINITY: null, "-INFINITY": null, "+INFINITY": null}),
]);

const ApiConstraintRole = t.keyof({
  Stopped: null,
  Started: null,
  Master: null,
  Promoted: null,
  Slave: null,
  Unpromoted: null,
});

const ApiConstraintAction = t.keyof({
  start: null,
  promote: null,
  demote: null,
  stop: null,
});

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

const ApiConstraintResourceSet = t.union([
  t.type({"id-ref": ApiId}),
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
export const ApiConstraints = t.partial({
  rsc_location: t.array(
    /*
      rule_string does not follow rng schema, however the ruby backend does it
      that way.  In backend sets inside locations are ignored. Location
      constraint with resource set are not sent.  Id is:
        - id of constraint
          - in ApiConstraintLocationNode
          - in ApiConstraintLocationRule with id-ref
        - id of rule
          - in ApiConstraintLocationRule with score or score attribute (i.e.
            without id-ref)
      */
    t.intersection([
      t.union([t.type({rsc: t.string}), t.type({"rsc-pattern": t.string})]),
      t.partial({
        role: ApiConstraintRole,
        "resource-discovery": t.keyof({
          always: null,
          never: null,
          exclusive: null,
        }),
      }),
      t.union([
        t.intersection([
          t.type({id: ApiId}),
          t.type({
            node: t.string,
            score: ApiScore,
          }),
        ]),
        t.intersection([
          /*
            It is not the full common rule. It is just shortened version which
            attributes are mixed into location constraint in the backend.
          */
          t.type({rule_string: t.string}),
          t.union([
            t.type({"id-ref": ApiId}),
            t.intersection([
              t.type({id: ApiId}),
              t.union([
                t.type({score: ApiScore}),
                t.type({"score-attribute": t.string}),
              ]),
              t.partial({role: t.string}),
            ]),
          ]),
        ]),
      ]),
    ]),
  ),
  rsc_colocation: t.array(
    /*
    The element lifetime with rules is not currently present in the backend
    response.
    */
    t.intersection([
      t.type({id: ApiId}),
      t.partial({score: ApiScore}),
      t.union([
        t.type({sets: t.array(ApiConstraintResourceSet)}),
        t.intersection([
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
        ]),
      ]),
    ]),
  ),
  rsc_order: t.array(
    t.intersection([
      t.type({id: ApiId}),
      t.partial({
        // symmetrical and require-all should be booleans, however, strings come
        // from backend
        symmetrical: t.string,
        "require-all": t.string,
      }),
      t.union([
        t.partial({score: ApiScore}),
        t.partial({
          kind: t.keyof({
            Optional: null,
            Mandatory: null,
            Serialize: null,
          }),
        }),
      ]),
      t.union([
        t.type({
          sets: t.array(ApiConstraintResourceSet),
        }),
        t.intersection([
          t.type({
            first: ApiId,
            // biome-ignore lint/suspicious/noThenProperty:it is a backend format
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
    ]),
  ),
  rsc_ticket: t.array(
    t.intersection([
      t.type({
        id: ApiId,
        ticket: t.string,
      }),
      t.partial({"loss-policy": ApiConstraintTicketLossPolicy}),
      t.union([
        t.type({sets: t.array(ApiConstraintResourceSet)}),
        t.intersection([
          t.type({rsc: t.string}),
          t.partial({"rsc-role": ApiConstraintRole}),
        ]),
      ]),
    ]),
  ),
});
