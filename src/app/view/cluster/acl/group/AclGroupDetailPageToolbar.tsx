import {
  ActionTaskLauncher,
  DetailLayoutToolbar,
  DetailLayoutToolbarAction,
  useSelectedClusterName,
} from "app/view/share";

import * as assignRoleTask from "./task/assignRole";

export const AclGroupDetailPageToolbar = ({
  groupName,
}: {
  groupName: string;
}) => {
  const clusterName = useSelectedClusterName();

  const assignRole = (
    <ActionTaskLauncher
      taskComponent={assignRoleTask.Task}
      useTask={assignRoleTask.useTask}
      label="Assign role"
      variant="secondary"
    />
  );

  const deleteGroup: DetailLayoutToolbarAction = {
    action: {
      type: "LIB.CALL.CLUSTER",
      key: { clusterName },
      payload: {
        taskLabel: `delete group "${groupName}"`,
        call: {
          name: "acl-remove-group",
          payload: { group_id: groupName },
        },
      },
    },
    confirm: {
      title: "Delete group?",
      description: <>This deletes the group {groupName}</>,
    },
  };

  return (
    <DetailLayoutToolbar
      toolbarName="group"
      buttonActions={{
        "Assign role": assignRole,
        "Delete group": deleteGroup,
      }}
    />
  );
};
