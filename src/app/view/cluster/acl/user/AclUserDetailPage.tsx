import {
  DataListWithMenu,
  DetailViewSection,
  useSelectedClusterName,
} from "app/view/share";

import { AclDetailLayout } from "../AclDetailLayout";
import { AclType } from "../types";

import { AclUserDetailPageToolbar } from "./AclUserDetailPageToolbar";

export const AclUserDetailPage = ({
  userId,
  roleIdList,
}: {
  userId: string;
  roleIdList: AclType<"user">;
}) => {
  const clusterName = useSelectedClusterName();

  return (
    <AclDetailLayout
      aclType="user"
      aclId={userId}
      toolbar={<AclUserDetailPageToolbar userId={userId} />}
    >
      <DetailViewSection caption="Roles assigned">
        <DataListWithMenu
          name="role"
          emptyTitle={`No role assigned to user "${userId}".`}
          itemList={roleIdList}
          menuItems={[
            roleId => ({
              name: "unassign-user",
              confirm: {
                title: "Unassign role?",
                description: `This unassigns the role ${roleId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign role "${roleId}"`,
                    call: {
                      name: "acl-unassign-role-from-target",
                      payload: { role_id: roleId, target_id: userId },
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
