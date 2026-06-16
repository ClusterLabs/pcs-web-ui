import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibPermissionDenied,
} from "app/view/share";

import {useTask} from "./useTask";

export const PermissionDenied = () => {
  const {aclRolePermissionAdd} = useTask();
  return (
    <TaskFinishLibPermissionDenied
      tryAgain={<TaskButtonResultTryAgain action={aclRolePermissionAdd} />}
      cancel={<TaskButtonResultCancel />}
    />
  );
};
