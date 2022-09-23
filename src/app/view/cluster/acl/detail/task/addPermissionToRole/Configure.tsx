import { PermissionAddForm } from "app/view/cluster/acl/PermissionAddForm";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    updateState,
    state: { permissionInfoList },
  } = useTask();

  return (
    <PermissionAddForm
      permissionList={permissionInfoList}
      update={permissionList =>
        updateState({ permissionInfoList: permissionList })
      }
    />
  );
};
