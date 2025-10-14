import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibCommunicationError,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.fenceDeviceDisable;

export const CommunicationError = () => {
  const {disableFenceDevice} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskButtonResultTryAgain
          action={() => disableFenceDevice({force: false})}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
