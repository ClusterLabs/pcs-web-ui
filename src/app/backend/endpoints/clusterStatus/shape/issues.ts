import * as t from "io-ts";

const ApiIssue = t.union([
  t.intersection([
    t.type({
      message: t.string,
    }),
    t.partial({
      type: t.string,
    }),
  ]),
  t.type({
    type: t.literal("nodes_not_authorized"),
    message: t.string,
    node_list: t.array(t.string),
  }),
]);

export const ApiWithIssues = t.type({
  error_list: t.array(ApiIssue),
  warning_list: t.array(ApiIssue),
});
