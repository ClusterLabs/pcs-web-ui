import * as responses from "dev/responses";

import {route, shortcuts} from "test/tools";

type PermissionList = ReturnType<
  typeof responses.permissions
>["users_permissions"];

type ClusterName = Extract<
  Parameters<typeof shortcuts.interceptWithCluster>[0],
  {clusterName: unknown}
>["clusterName"];

type AdditionalRouteList = Parameters<
  typeof shortcuts.interceptWithCluster
>[0]["additionalRouteList"];

export const interceptForPermissions = ({
  clusterName,
  additionalRouteList,
  usersPermissions,
}: {
  clusterName: ClusterName;
  additionalRouteList?: AdditionalRouteList;
  usersPermissions: PermissionList;
}) => {
  shortcuts.interceptWithCluster({
    clusterName,
    additionalRouteList,
    replaceRoutes: {
      permissions: route.getPermissions({
        clusterName,
        permissions: {
          ...responses.permissions(),
          users_permissions: usersPermissions,
        },
      }),
    },
  });
};
