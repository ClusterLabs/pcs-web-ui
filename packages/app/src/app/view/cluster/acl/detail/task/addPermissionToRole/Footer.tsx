import {testMarks} from "app/view/dataTest";
import {TaskButtonCancel, TaskButtonNextWithValidation} from "app/view/share";

import {useTask} from "./useTask";

const {aclRoleAddPermission} = testMarks.task;

export const Footer = () => {
  const {label, aclRolePermissionAdd, invalidPermissionIndexes} = useTask();
  return (
    <>
      <TaskButtonNextWithValidation
        run={aclRolePermissionAdd}
        runIf={invalidPermissionIndexes.length === 0}
        {...aclRoleAddPermission.run.mark}
      >
        {label}
      </TaskButtonNextWithValidation>
      <TaskButtonCancel {...aclRoleAddPermission.cancel.mark} />
    </>
  );
};
