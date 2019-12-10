import * as t from "io-ts";

const ApiAclRoleId = t.string;

/*
TODO complete attributes according rng schemes
datasource: /cib/configuration/acls/*
The keys of records are "id".

In the case of not running cluster acls are empty object.
*/

export const ApiAcl = t.partial({
  role: t.record(t.string, t.type({
    description: t.string,
    permissions: t.array(t.string),
  })),
  group: t.record(t.string, t.array(ApiAclRoleId)),
  user: t.record(t.string, t.array(ApiAclRoleId)),
  target: t.record(t.string, t.array(ApiAclRoleId)),
});
