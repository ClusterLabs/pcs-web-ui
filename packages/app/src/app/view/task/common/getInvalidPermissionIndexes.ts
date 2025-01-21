import type {ActionPayload} from "app/store";

export type PermissionListForWrite =
  ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"]["permissionInfoList"];

export const getInvalidPermissionIndexes = (
  permissionList: PermissionListForWrite,
) =>
  permissionList.reduce<number[]>(
    (indexes, permission, i) => [
      ...indexes,
      ...(permission[2].length > 0 ? [] : [i]),
    ],
    [],
  );
