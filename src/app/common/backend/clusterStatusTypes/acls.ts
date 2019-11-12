import * as t from "io-ts";

const TApiAclRoleId = t.string;

/*
TODO complete attributes according rng schemes
datasource: /cib/configuration/acls/*
The keys of records are "id".
*/

export const TApiAcl = t.type({
  role: t.record(t.string, t.type({
    description: t.string,
    permissions: t.array(t.string),
  })),
  group: t.record(t.string, t.array(TApiAclRoleId)),
  user: t.record(t.string, t.array(TApiAclRoleId)),
  target: t.record(t.string, t.array(TApiAclRoleId)),
});
