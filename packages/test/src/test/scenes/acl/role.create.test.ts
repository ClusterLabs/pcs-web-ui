import {intercept, route, shortcuts} from "test/tools";
import {task as allTasks, cluster} from "test/workflow";

import {clusterStatus} from "./common";

const task = allTasks.aclRoleCreate;

const clusterName = clusterStatus.cluster_name;

const roleId = "third";
const description = "Third description";
const permissionInfoList: Parameters<typeof task.permissions.fill>[0] = [
  ["read", "id", "some-id"],
  ["write", "xpath", "some-xpath"],
];

describe("ACL role create task", () => {
  afterEach(intercept.stop);
  it("should successfully create new role", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclRoleCreate({
          clusterName,
          roleId,
          description,
          permissionInfoList,
        }),
      ],
    });

    await cluster.goTo({clusterName, tabName: "acl"});
    await task.open();
    await task.fillNameAndDescription(roleId, description);
    await task.nextFrom("Enter role name");
    await task.permissions.add();
    await task.permissions.fill(permissionInfoList);
    await task.nextFrom("Specify permissions");
    await task.nextFrom("Review");
    await task.waitForSuccess();
  });
});
