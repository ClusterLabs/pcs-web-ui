import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus} from "./common";
import {goToRole, toolbar} from "./commonRole";

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
        intercept.route.aclAssignRoleToGroup({
          clusterName,
          roleId,
          groupId,
        }),
      ],
    });
    await goToRole(roleId);
    await toolbar.launch(toolbar => [
      toolbar.dropdown,
      toolbar.dropdown.assignGroup,
    ]);
    await select(task.name, groupId);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
