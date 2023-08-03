import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibCommunicationError,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.sbdDisable;

export const CommunicationError = () => {
  const {sbdDisable} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskButtonResultTryAgain
          action={() => sbdDisable({force: false})}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
