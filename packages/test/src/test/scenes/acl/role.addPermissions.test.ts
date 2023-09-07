import {intercept, route, shortcuts} from "test/tools";
import {task as allTasks, cluster} from "test/workflow";

import {clusterStatus} from "./common";

const task = allTasks.aclRoleAddPermissions;

const clusterName = clusterStatus.cluster_name;

const roleId = "first";
const permissionInfoList: Parameters<typeof task.permissions.fill>[0] = [
  ["read", "id", "some-id"],
  ["write", "xpath", "some-xpath"],
];

describe("ACL role add permission task", () => {
  afterEach(intercept.stop);
  it("should successfully add permissions to role", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclAddPermission({
          clusterName,
          roleId,
          permissionInfoList,
        }),
      ],
    });
    await cluster.goTo({clusterName, tabName: "acl"});
    await page.click(cluster.acl.roleLinkSelector(roleId));
    await task.open();
    await task.permissions.add();
    await task.permissions.fill(permissionInfoList);
    await task.run();
  });
});
