import * as cs from "dev/responses/clusterStatus/tools";
import * as responses from "dev/responses";

import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

type PermissionList = ReturnType<
  typeof responses.permissions
>["users_permissions"];

type AdditionalRouteList = Parameters<
  typeof mock.shortcuts.withCluster
>[0]["additionalRouteList"];

export const clusterName = "test-cluster";

export const mockForPermissions = ({
  additionalRouteList,
  usersPermissions,
}: {
  additionalRouteList?: AdditionalRouteList;
  usersPermissions: PermissionList;
}) => {
  mock.shortcuts.withCluster({
    clusterStatus: cs.cluster(clusterName, "ok"),
    additionalRouteList,
    replaceRoutes: {
      permissions: mock.route.getPermissions({
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
