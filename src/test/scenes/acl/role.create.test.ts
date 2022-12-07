import * as workflow from "test/workflow";
import {intercept, location, route, shortcuts} from "test/tools";

const {
  open,
  nextFrom,
  fillNameAndDescription,
  permissionAdd,
  fillPermissions,
  waitForSuccess,
} = workflow.task.aclRoleCreate;
const clusterName = "actions";

const openTask = async () => {
  await page.goto(location.acl({clusterName}));
  await open();
};

const roleId = "role-1";
const description = "Role 1 description";
const permissionInfoList: Parameters<
  typeof route.aclRoleCreate
>[0]["permissionInfoList"] = [
  ["read", "id", "some-id"],
  ["write", "xpath", "some-xpath"],
];

describe("ACL role create task", () => {
  afterEach(intercept.stop);
  it("should successfully create new role", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.aclRoleCreate({
          clusterName,
          roleId,
          description,
          permissionInfoList,
        }),
      ],
    });
    await openTask();
    await fillNameAndDescription(roleId, description);
    await nextFrom("Enter role name");
    await permissionAdd();
    await fillPermissions(permissionInfoList);
    await nextFrom("Specify permissions");
    await nextFrom("Review");
    await waitForSuccess();
  });
});
