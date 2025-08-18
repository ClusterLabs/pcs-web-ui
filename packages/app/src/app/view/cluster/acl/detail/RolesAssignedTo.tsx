import type {ActionPayload} from "app/store";
import {
  DataListWithMenu,
  DataListItemWithMenu,
  LauncherDropdown,
  Link,
  location,
} from "app/view/share";
import {DetailViewSection, useLoadedCluster} from "app/view/cluster/share";

import type {AclType} from "../types";

type LibCall = ActionPayload["LIB.CALL.CLUSTER"]["call"];

export const RolesAssignedTo = (props: {
  subjectId: string;
  roleIdList: AclType<"user" | "group">;
  unassignCall: (roleId: string) => LibCall;
}) => {
  const {clusterName} = useLoadedCluster();
  return (
    <DetailViewSection caption="Roles assigned">
      <DataListWithMenu
        name="role"
        emptyTitle={`No role assigned to "${props.subjectId}".`}
        itemList={props.roleIdList}
      >
        {roleId => (
          <DataListItemWithMenu
            item={roleId}
            menu={
              <LauncherDropdown
                items={[
                  {
                    name: "unassign",
                    confirm: {
                      title: "Unassign role?",
                      description: `This unassigns the role ${roleId}`,
                      action: {
                        type: "LIB.CALL.CLUSTER",
                        key: {clusterName},
                        payload: {
                          taskLabel: `unassign role "${roleId}"`,
                          call: props.unassignCall(roleId),
                        },
                      },
                    },
                  },
                ]}
              />
            }
          >
            <Link to={location.aclRole({clusterName, roleId})}>{roleId}</Link>
          </DataListItemWithMenu>
        )}
      </DataListWithMenu>
    </DetailViewSection>
  );
};
