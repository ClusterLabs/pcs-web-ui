import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus} from "./common";
import {goToRole, toolbar} from "./commonRole";

const {select} = shortcuts.patternfly;

const {aclAssignSubjectToRole: task} = marks.task;

const clusterName = clusterStatus.cluster_name;
const roleId = "first";
const userId = "user2";

describe("ACL role assign user task", () => {
  afterEach(intercept.stop);
  it("should successfully assign user to role", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        route.aclAssignRoleToTarget({
          clusterName,
          roleId,
          targetId: userId,
        }),
      ],
    });
    await goToRole(roleId);
    await toolbar.launch(toolbar => toolbar.assignUser);
    await select(task.name, userId);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
