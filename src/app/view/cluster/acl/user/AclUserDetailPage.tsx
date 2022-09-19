import { Divider } from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  DataListWithMenu,
  DetailLayout,
  DetailViewSection,
  useClusterSelector,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

import { AclDoesNotExist } from "../AclDoesNotExist";
import { AclDetailCaption } from "../AclDetailCaption";

import { AclUserDetailPageToolbar } from "./AclUserDetailPageToolbar";

export const AclUserDetailPage = () => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: userId } = useGroupDetailViewContext();
  const [{ acls }] = useClusterSelector(selectors.getCluster);
  const user = acls.user?.[userId];

  if (!user) {
    return <AclDoesNotExist aclType="user" aclName={userId} />;
  }

  const roleIdList = user;

  return (
    <DetailLayout
      caption={<AclDetailCaption aclName={userId} type={"User"} />}
      toolbar={<AclUserDetailPageToolbar userName={userId} />}
    >
      <Divider />
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
    </DetailLayout>
  );
};
