import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.sbdDisable;

export const CommunicationError = () => {
  const {sbdDisable} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskResultActionTryAgain
          action={() => sbdDisable({force: false})}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskResultActionCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
