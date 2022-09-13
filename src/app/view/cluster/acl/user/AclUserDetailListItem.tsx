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

export const AclUserDetailListItem = ({ roleName }: { roleName: string }) => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: userName } = useGroupDetailViewContext();

  const unassignUser: LauncherItem = {
    name: "unassign-user",
    confirm: {
      title: "Unassign role?",
      description: <>This unassigns the role {roleName}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `unassign role "${roleName}"`,
          call: {
            name: "acl-unassign-role-from-target",
            payload: { role_id: roleName, target_id: userName },
          },
        },
      },
    },
  };

  return (
    <DataListItem>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={<DataListCell>{roleName}</DataListCell>}
        />
        <DataListAction
          id={"user-remove-role"}
          aria-labelledby={"user-remove-role"}
          aria-label={"Role actions"}
        >
          <LauncherDropdown items={[unassignUser]} dropdownName="role" />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
