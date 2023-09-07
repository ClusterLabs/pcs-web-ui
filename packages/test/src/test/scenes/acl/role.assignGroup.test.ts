import {intercept, route, shortcuts} from "test/tools";
import {task as allTasks, cluster} from "test/workflow";

import {clusterStatus} from "./common";

const task = allTasks.aclRoleAssignGroup;

const clusterName = clusterStatus.cluster_name;
const roleId = "first";
const groupId = "group2";

describe("ACL role assign group task", () => {
  afterEach(intercept.stop);
  it("should successfully assign group to role", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclAssignRoleToGroup({
          clusterName,
          roleId,
          groupId,
        }),
      ],
    });
    await cluster.goTo({clusterName, tabName: "acl"});
    await page.click(cluster.acl.roleLinkSelector(roleId));
    await task.open();
    await task.selectGroup(groupId);
    await task.run();
  });
});
