import {
  DataListWithMenu,
  DetailViewSection,
  useSelectedClusterName,
} from "app/view/share";

import { AclDetailLayout } from "../AclDetailLayout";
import { AclType } from "../types";

import { AclGroupDetailPageToolbar } from "./AclGroupDetailPageToolbar";

export const AclGroupDetailPage = ({
  groupId,
  roleIdList,
}: {
  groupId: string;
  roleIdList: AclType<"group">;
}) => {
  const clusterName = useSelectedClusterName();

  return (
    <AclDetailLayout
      aclType="group"
      aclId={groupId}
      toolbar={<AclGroupDetailPageToolbar groupName={groupId} />}
    >
      <DetailViewSection caption="Roles assigned">
        <DataListWithMenu
          name="role"
          emptyTitle={`No role assigned to group "${groupId}".`}
          itemList={roleIdList}
          menuItems={[
            roleId => ({
              name: "unassign-group",
              confirm: {
                title: "Unassign role?",
                description: `This unassigns the role ${roleId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign role "${roleId}"`,
                    call: {
                      name: "acl-unassign-role-from-group",
                      payload: { role_id: roleId, group_id: groupId },
                    },
                  },
                },
              },
            }),
          ]}
        />
      </DetailViewSection>
    </AclDetailLayout>
  );
};
