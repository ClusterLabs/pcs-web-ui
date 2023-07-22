import {PermissionListForWrite} from "../types";

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
