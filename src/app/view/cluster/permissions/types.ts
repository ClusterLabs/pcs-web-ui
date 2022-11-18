import {selectors} from "app/store";

type PermissionStorage = NonNullable<
  ReturnType<ReturnType<typeof selectors.getClusterPermissions>>
>;

export type Permission = Exclude<
  PermissionStorage["data"],
  null
>["users_permissions"][number];
