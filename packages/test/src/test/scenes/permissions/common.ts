import * as cs from "dev/responses/clusterStatus/tools";
import * as responses from "dev/responses";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

type PermissionList = ReturnType<
  typeof responses.permissions
>["users_permissions"];

type AdditionalRouteList = Parameters<
  typeof intercept.shortcuts.interceptWithCluster
>[0]["additionalRouteList"];

export const clusterName = "test-cluster";

export const interceptForPermissions = ({
  additionalRouteList,
  usersPermissions,
}: {
  additionalRouteList?: AdditionalRouteList;
  usersPermissions: PermissionList;
}) => {
  intercept.shortcuts.interceptWithCluster({
    clusterStatus: cs.cluster(clusterName, "ok"),
    additionalRouteList,
    replaceRoutes: {
      permissions: intercept.route.getPermissions({
        clusterName,
        permissions: {
          ...responses.permissions(),
          users_permissions: usersPermissions,
        },
      }),
    },
  });
};

export const toolbar = shortcuts.toolbar(marks.cluster.permissionsToolbar);
export const goToPermissions = async () => {
  await shortcuts.dashboard.goToCluster(clusterName, tabs => tabs.permissions);
};
