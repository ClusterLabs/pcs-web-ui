import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.aclAssignSubjectToRole;

export const CommunicationError = () => {
  const {assign} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskResultActionTryAgain
          action={assign}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskResultActionCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
