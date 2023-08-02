import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.aclRoleAddPermission;

export const CommunicationError = () => {
  const {aclRolePermissionAdd} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskResultActionTryAgain
          action={aclRolePermissionAdd}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskResultActionCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
