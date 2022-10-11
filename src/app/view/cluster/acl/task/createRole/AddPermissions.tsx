import { TaskLibStep } from "app/view/share";
import { PermissionAddForm } from "app/view/cluster/acl/PermissionAddForm";

import { useTask } from "./useTask";

export const AddPermissions = () => {
  const {
    updateState,
    invalidPermissionIndexes,
    state: {
      permissionInfoList,
      libCall: { reports },
      showValidationErrors,
    },
  } = useTask();
  return (
    <TaskLibStep title="Add permissions" reports={reports}>
      <PermissionAddForm
        permissionList={permissionInfoList}
        invalidPermissionIndexes={invalidPermissionIndexes}
        showValidationErrors={showValidationErrors}
        update={permissionList =>
          updateState({ permissionInfoList: permissionList })
        }
      />
    </TaskLibStep>
  );
};
