import { selectors } from "app/store";

export type Acls = ReturnType<ReturnType<typeof selectors.getCluster>>["acls"];

export type AclType<ACL_TYPE extends "role" | "user" | "group"> = Exclude<
  Acls[ACL_TYPE],
  undefined
>[keyof Acls[ACL_TYPE]];
