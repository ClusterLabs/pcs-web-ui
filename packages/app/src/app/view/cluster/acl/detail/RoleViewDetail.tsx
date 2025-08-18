import {
  DataListWithMenu,
  DataListItemWithMenu,
  LauncherDropdown,
} from "app/view/share";
import {testMarks} from "app/view/dataTest";
import {DetailViewSection, useLoadedCluster} from "app/view/cluster/share";

import type {AclType} from "../types";

const {detail} = testMarks.cluster.acl.currentRole;
const {actions, label} = detail.permissionList.permission;

const extractId = (permission: string): string => {
  const match = permission.match(/\(([^)]+)\)$/);
  return match ? match[1] : permission;
};

export const RoleViewDetail = ({
  roleId,
  role,
}: {
  roleId: string;
  role: AclType<"role">;
}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <span {...detail.mark}>
      <DetailViewSection caption="Description">
        <p>{role.description}</p>
      </DetailViewSection>

      <DetailViewSection caption="Permissions">
        <DataListWithMenu
          name="permission"
          emptyTitle={`No permission assigned to role "${roleId}".`}
          itemList={role.permissions}
          {...detail.permissionList.mark}
        >
          {permission => (
            <DataListItemWithMenu
              item={permission}
              menu={
                <LauncherDropdown
                  items={[
                    {
                      name: "remove",
                      confirm: {
                        title: "Remove permission?",
                        description: `This removes the permission ${permission}`,
                        action: {
                          type: "LIB.CALL.CLUSTER",
                          key: {clusterName},
                          payload: {
                            taskLabel: `remove permission "${permission}"`,
                            call: {
                              name: "acl-remove-permission",
                              payload: {permission_id: extractId(permission)},
                            },
                          },
                        },
                      },
                      ...actions.remove.mark,
                    },
                  ]}
                  {...actions.mark}
                />
              }
              {...detail.permissionList.permission.mark}
            >
              <span {...label.mark}>{permission}</span>
            </DataListItemWithMenu>
          )}
        </DataListWithMenu>
      </DetailViewSection>
    </span>
  );
};
