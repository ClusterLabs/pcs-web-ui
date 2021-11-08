import React from "react";

import { Action } from "app/store";
import { DropdownActionListMenu, ModalAction } from "app/view/share/DropdownActionListMenu";

export const PermissionMenu:
React.FC<{
  permissionName: string, clusterName: string,
  permissions: { name: string;
    type: string; allow: string[]; }[],
}> = ({
    permissionName,
    clusterName,
    permissions,
  }) => {

    const editAction: Action = {
      type: "CLUSTER.PERMISSIONS.EDIT",
      key: {permissionName},
    };
  
    const removeAction: Action = {
      type: "CLUSTER.PERMISSIONS.SAVE",
      key: {clusterName, permissionName},
      payload: {permissions},
    };
  
    const edit: ModalAction = {
      confirm: {
        title: `Edit the permission "${permissionName}"?`,
        description:
          "You can edit the permission.",
      },
      action: editAction,
    };
  
    const remove: ModalAction = {
      confirm: {
        title: `Remove the permission "${permissionName}"?`,
        description:
          "Removes the permission.",
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
