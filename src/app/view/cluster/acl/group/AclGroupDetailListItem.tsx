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

export const AclGroupDetailListItem = ({ roleName }: { roleName: string }) => {
  const clusterName = useSelectedClusterName();
  const { selectedItemUrlName: groupName } = useGroupDetailViewContext();

  const unassignGroup: LauncherItem = {
    name: "unassign-group",
    confirm: {
      title: "Unassign role?",
      description: <>This unassigns the role {roleName}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `unassign role "${roleName}"`,
          call: {
            name: "acl-unassign-role-from-group",
            payload: { role_id: roleName, group_id: groupName },
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
          id={"group-remove-role"}
          aria-labelledby={"group-remove-role"}
          aria-label={"Role actions"}
        >
          <LauncherDropdown items={[unassignGroup]} dropdownName="role" />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
