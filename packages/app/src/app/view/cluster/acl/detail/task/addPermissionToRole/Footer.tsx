import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNext} from "app/view/share";

import {useTask} from "./useTask";

const {aclRoleAddPermission} = testMarks.task;

export const Footer = () => {
  const {label, aclRolePermissionAdd, invalidPermissionIndexes} = useTask();
  return (
    <>
      <TaskButtonNext
        run={aclRolePermissionAdd}
        runIf={invalidPermissionIndexes.length === 0}
        {...aclRoleAddPermission.run.mark}
      >
        {label}
      </TaskButtonNext>
      <TaskButtonCancel {...aclRoleAddPermission.cancel.mark} />
    </>
  );
};
