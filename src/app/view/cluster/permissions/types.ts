import {useLoadedPermissions} from "./LoadedPermissionsContext";

export type Permission = ReturnType<
  typeof useLoadedPermissions
>["users_permissions"][number];
