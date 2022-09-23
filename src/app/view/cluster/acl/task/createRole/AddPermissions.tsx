import { TaskLibStep } from "app/view/share";
import { PermissionAddForm } from "app/view/cluster/acl/PermissionAddForm";

import { useTask } from "./useTask";

export const AddPermissions = () => {
  const {
    updateState,
    state: {
      permissionInfoList,
      libCall: { reports },
    },
  } = useTask();
  return (
    <TaskLibStep title="Add permissions" reports={reports}>
      <PermissionAddForm
        permissionList={permissionInfoList}
        update={permissionList =>
          updateState({ permissionInfoList: permissionList })
        }
      />
    </TaskLibStep>
  );
};
