import { selectors } from "app/store";

export type Permission = NonNullable<
  ReturnType<ReturnType<typeof selectors.getClusterPermissions>>
>["users_permissions"][number];
