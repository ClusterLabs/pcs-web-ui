import {
  DataListWithMenu,
  DataListItemWithMenu,
  LauncherDropdown,
} from "app/view/share";
import {DetailViewSection, useLoadedCluster} from "app/view/cluster/share";

import type {AclType} from "../types";

export const RoleViewDetail = ({
  roleId,
  role,
}: {
  roleId: string;
  role: AclType<"role">;
}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <>
      <DetailViewSection caption="Description">
        <p>{role.description}</p>
      </DetailViewSection>

      <DetailViewSection caption="Permissions">
        <DataListWithMenu
          name="permission"
          emptyTitle={`No permission assigned to role "${roleId}".`}
          itemList={role.permissions}
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
                              payload: {permission_id: permission},
                            },
                          },
                        },
                      },
                    },
                  ]}
                />
              }
            >
              <span>{permission}</span>
            </DataListItemWithMenu>
          )}
        </DataListWithMenu>
      </DetailViewSection>
    </>
  );
};
