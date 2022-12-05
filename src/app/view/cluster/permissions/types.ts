import {useLoadedPermissions} from "./LoadedPermissionsContext";

export type Permission = ReturnType<
  typeof useLoadedPermissions
>["permissions"]["users_permissions"][number];
