import {intercept, route, shortcuts} from "test/tools";
import {task as allTasks, cluster} from "test/workflow";

import {clusterStatus} from "./common";

const task = allTasks.aclRoleAssignUser;

const clusterName = clusterStatus.cluster_name;
const roleId = "first";
const userId = "user2";

describe("ACL role assign user task", () => {
  afterEach(intercept.stop);
  it("should successfully assign user to role", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclAssignRoleToTarget({
          clusterName,
          roleId,
          targetId: userId,
        }),
      ],
    });
    await cluster.goTo({clusterName, tabName: "acl"});
    await page.click(cluster.acl.roleLinkSelector(roleId));
    await task.open();
    await task.selectUser(userId);
    await task.run();
  });
});
