import {mock} from "test/tools";

import {clusterStatus} from "./common";
import {goToRole, toolbar} from "./commonRole";

const {aclAssignSubjectToRole: task} = marks.task;

const clusterName = clusterStatus.cluster_name;
const roleId = "first";
const groupId = "group2";

describe("ACL role assign group task", () => {
  afterEach(mock.stop);
  it("should successfully assign group to role", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.aclAssignRoleToGroup({
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
