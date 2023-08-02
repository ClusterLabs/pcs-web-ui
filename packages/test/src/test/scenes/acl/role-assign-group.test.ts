import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus} from "./common";
import {goToRole, openTask} from "./commonRole";

const {select} = shortcuts.patternfly;

const {aclAssignSubjectToRole: task} = marks.task;

const clusterName = clusterStatus.cluster_name;
const roleId = "first";
const groupId = "group2";

describe("ACL role assign group task", () => {
  afterEach(intercept.stop);
  it("should successfully assign group to role", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclAssignRoleToGroup({
          clusterName,
          roleId,
          groupId,
        }),
      ],
    });
    await goToRole(roleId);
    await openTask(toolbar => [toolbar.dropdown, toolbar.assignGroup]);
    await select(task.name, groupId);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
