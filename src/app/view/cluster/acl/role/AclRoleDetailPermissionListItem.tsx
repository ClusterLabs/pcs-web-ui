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
  useSelectedClusterName,
} from "app/view/share";

export const AclRoleDetailPermissionListItem = ({
  permission,
}: {
  permission: string;
}) => {
  const clusterName = useSelectedClusterName();

  const remove: LauncherItem = {
    name: "remove",
    confirm: {
      title: "Remove permission?",
      description: <>This removes the permission {permission}</>,
      action: {
        type: "LIB.CALL.CLUSTER",
        key: { clusterName },
        payload: {
          taskLabel: `remove permission "${permission}"`,
          call: {
            name: "acl-remove-permission",
            payload: { permission_id: permission },
          },
        },
      },
    },
  };

  return (
    <DataListItem>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={<DataListCell>{permission}</DataListCell>}
        />
        <DataListAction
          id={"role-remove-permission"}
          aria-labelledby={"role-remove-permission"}
          aria-label={"Permission actions"}
        >
          <LauncherDropdown items={[remove]} dropdownName={"permission"} />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
