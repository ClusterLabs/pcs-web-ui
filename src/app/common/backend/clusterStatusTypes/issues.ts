/* eslint-disable camelcase */
import * as t from "io-ts";

export const ApiIssue = t.intersection([
  t.type({
    message: t.string,
  }),
  t.partial({
    type: t.string,
    node_list: t.array(t.string),
  }),
]);

export const ApiWithIssues = t.type({
  error_list: t.array(ApiIssue),
  warning_list: t.array(ApiIssue),
});
