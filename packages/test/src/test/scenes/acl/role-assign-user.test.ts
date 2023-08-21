import {mock} from "test/tools";

import {clusterStatus} from "./common";
import {goToRole} from "./commonRole";

const {aclAssignSubjectToRole: task} = marks.task;

const clusterName = clusterStatus.cluster_name;
const roleId = "first";
const userId = "user2";

describe("ACL role assign user task", () => {
  afterEach(mock.stop);
  it("should successfully assign user to role", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.aclAssignRoleToTarget({
          clusterName,
          roleId,
          targetId: userId,
        }),
      ],
    });
    await goToRole(roleId);
    await click(marks.cluster.acl.currentRole.toolbar.assignUser);
    await select(task.name, userId);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
