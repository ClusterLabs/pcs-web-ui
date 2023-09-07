import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibCommunicationError,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.aclAssignSubjectToRole;

export const CommunicationError = () => {
  const {assign} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskButtonResultTryAgain
          action={assign}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
