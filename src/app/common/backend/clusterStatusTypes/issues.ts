/* eslint-disable camelcase */
import * as t from "io-ts";

export const TApiIssue = t.intersection([
  t.type({
    message: t.string,
  }),
  t.partial({
    type: t.string,
    node_list: t.array(t.string),
  }),
]);

export const TApiWithIssues = t.type({
  error_list: t.array(TApiIssue),
  warning_list: t.array(TApiIssue),
});
