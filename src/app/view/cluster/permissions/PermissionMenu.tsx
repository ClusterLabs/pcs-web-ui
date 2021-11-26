import { Action, selectors } from "app/store";
import { DropdownActionListMenu, ModalAction } from "app/view/share";

import { useTask } from "./task/useTask";

const { getClusterPermissions } = selectors;

type Permission = NonNullable<
  ReturnType<ReturnType<typeof getClusterPermissions>>
>["users_permissions"][number];

export const PermissionMenu: React.FC<{
  permission: Permission;
  clusterName: string;
  permissionList: Permission[];
}> = ({ permission, clusterName, permissionList }) => {
  const { open } = useTask();

  const removeAction: Action = {
    type: "CLUSTER.PERMISSIONS.SAVE",
    key: { clusterName, task: "permissionRemove" },
    payload: {
      permissionList: permissionList.filter(
        p => p.name !== permission.name || p.type !== permission.type,
      ),
    },
  };

  const edit: ModalAction = {
    onClick: () => open({ type: "update", permission }),
  };

  const remove: ModalAction = {
    confirm: {
      title: `Remove the permission "${permission.name}"?`,
      description: "Removes the permission.",
    },
    action: removeAction,
  };

  return (
    <>
      <DropdownActionListMenu
        dropdownActions={{
          edit,
          remove,
        }}
      />
    </>
  );
};
