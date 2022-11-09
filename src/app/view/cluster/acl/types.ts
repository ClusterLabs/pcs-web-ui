import {ActionPayload, selectors} from "app/store";

export type Acls = ReturnType<ReturnType<typeof selectors.getCluster>>["acls"];

export type AclType<ACL_TYPE extends "role" | "user" | "group"> = Exclude<
  Acls[ACL_TYPE],
  undefined
>[keyof Acls[ACL_TYPE]];

export type PermissionListForWrite =
  ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"]["permissionInfoList"];
