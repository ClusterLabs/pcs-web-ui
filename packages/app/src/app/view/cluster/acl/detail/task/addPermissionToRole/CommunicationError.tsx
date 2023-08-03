import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibCommunicationError,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.aclRoleAddPermission;

export const CommunicationError = () => {
  const {aclRolePermissionAdd} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskButtonResultTryAgain
          action={aclRolePermissionAdd}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
