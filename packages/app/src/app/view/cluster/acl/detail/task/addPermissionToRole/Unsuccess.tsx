import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibUnsuccess,
  TaskResultActionBackCluster,
  TaskResultActionCancel,
  TaskResultActionProceedAnyway,
} from "app/view/share";

import {useTask} from "./useTask";

const {unsuccess} = testMarks.task.aclRoleAddPermission;
export const Unsuccess = () => {
  const {
    aclRolePermissionAdd,
    state: {
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskFinishLibUnsuccess
      reports={reports}
      back={<TaskResultActionBackCluster {...unsuccess.back.mark} />}
      proceed={
        <TaskResultActionProceedAnyway
          action={aclRolePermissionAdd}
          {...unsuccess.proceedAnyway.mark}
        />
      }
      cancel={<TaskResultActionCancel {...unsuccess.cancel.mark} />}
      {...unsuccess.mark}
    />
  );
};
