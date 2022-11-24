import {ActionPayload} from "app/store";
import {useLoadedCluster} from "app/view/cluster/share";

export type Acls = ReturnType<typeof useLoadedCluster>[1]["acls"];

export type AclType<ACL_TYPE extends "role" | "user" | "group"> = Exclude<
  Acls[ACL_TYPE],
  undefined
>[keyof Acls[ACL_TYPE]];

export type PermissionListForWrite =
  ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"]["permissionInfoList"];
