import {mock} from "test/tools";

import {
  clusterStatus,
  permissionXpath1Id,
  permissionXpath1Label,
  rolesForUser1,
} from "./common";
import {goToRole} from "./commonRole";

const confirmTitle = "Remove permission?";

const roleId = rolesForUser1[0];

describe("ACL role remove permission task", () => {
  afterEach(mock.stop);
  it("should successfully remove permission from role", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.aclRemovePermission({
          clusterName: clusterStatus.cluster_name,
          permissionId: permissionXpath1Id,
        }),
      ],
    });

    await goToRole(roleId);
    await click(
      item.byKey(
        marks.cluster.acl.currentRole.detail.permissionList.permission,
        p => p.label,
        permissionXpath1Label,
        [p => p.actions, p => p.actions.remove],
      ),
    );
    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.success);
  });
});
