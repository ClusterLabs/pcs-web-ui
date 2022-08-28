import {
  DataListAction,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import {
  DetailLayoutToolbarAction,
  DropdownActionListMenu,
  useSelectedClusterName,
} from "app/view/share";

export const AclRoleDetailPermissionListItem = ({
  permission,
}: {
  permission: string;
}) => {
  const clusterName = useSelectedClusterName();

  const remove: DetailLayoutToolbarAction = {
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
    confirm: {
      title: "Remove permission?",
      description: <>This removes the permission {permission}</>,
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
          <DropdownActionListMenu
            dropdownActions={{
              remove,
            }}
          />
        </DataListAction>
      </DataListItemRow>
    </DataListItem>
  );
};
