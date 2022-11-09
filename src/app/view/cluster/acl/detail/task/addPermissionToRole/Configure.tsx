import {PermissionAddForm} from "app/view/cluster/acl/PermissionAddForm";

import {useTask} from "./useTask";

export const Configure = () => {
  const {
    updateState,
    invalidPermissionIndexes,
    state: {permissionInfoList, showValidationErrors},
  } = useTask();

  return (
    <PermissionAddForm
      permissionList={permissionInfoList}
      invalidPermissionIndexes={invalidPermissionIndexes}
      showValidationErrors={showValidationErrors}
      update={permissionList =>
        updateState({permissionInfoList: permissionList})
      }
    />
  );
};
