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
        mock.route.aclRemovePermission({permissionId: permissionXpath1Id}),
      ],
    });

    await goToRole(roleId);
    const {permission} = marks.cluster.acl.currentRole.detail.permissionList;
    await dropdown(
      item.byKey(
        permission,
        p => p.label,
        permissionXpath1Label,
        p => p.actions,
      ),
      permission.actions.remove,
    );
    await appConfirm.run(confirmTitle);
    await isVisible(marks.notifications.toast.success);
  });
});
