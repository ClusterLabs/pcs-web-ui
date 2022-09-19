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

import { AclGroupDetailPageToolbar } from "./AclGroupDetailPageToolbar";

export const AclGroupDetailPage = () => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: groupId } = useGroupDetailViewContext();
  const [{ acls }] = useClusterSelector(selectors.getCluster);
  const group = acls.group?.[groupId];

  if (!group) {
    return <AclDoesNotExist aclType="group" aclName={groupId} />;
  }

  const roleIdList = group;

  return (
    <DetailLayout
      caption={<AclDetailCaption aclName={groupId} type={"Group"} />}
      toolbar={<AclGroupDetailPageToolbar groupName={groupId} />}
    >
      <Divider />
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
    </DetailLayout>
  );
};
