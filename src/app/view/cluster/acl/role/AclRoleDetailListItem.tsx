import {
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {
  LauncherDropdown,
  LauncherItem,
  useGroupDetailViewContext,
  useSelectedClusterName,
} from "app/view/share";

export const AclRoleDetailListItem = ({
  aclName,
  aclType,
}: {
  aclName: string;
  aclType: "user" | "group";
}) => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: roleName } = useGroupDetailViewContext();

  const unassignUser: LauncherItem = {
    name: "unassign-user",
    confirm: {
      title: "Unassign user?",
      description: <>This unassigns the user {aclName}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `unassign user "${aclName}"`,
          call: {
            name: "acl-unassign-role-from-target",
            payload: { role_id: roleName, target_id: aclName },
          },
        },
      },
    },
  };

  const unassignGroup: LauncherItem = {
    name: "unassign-group",
    confirm: {
      title: "Unassign group?",
      description: <>This unassigns the group {aclName}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `unassign group "${aclName}"`,
          call: {
            name: "acl-unassign-role-from-group",
            payload: { role_id: roleName, group_id: aclName },
          },
        },
      },
    },
  };

  return (
    <DataListItem>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={<DataListCell>{aclName}</DataListCell>}
        />
        <DataListAction
          id={"role-remove-acl"}
          aria-labelledby={"role-remove-acl"}
          aria-label={"Acl actions"}
        >
          <LauncherDropdown
            items={[aclType === "user" ? unassignUser : unassignGroup]}
            dropdownName={"role"}
          />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
