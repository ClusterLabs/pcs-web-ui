import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibCommunicationError,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.constraintTicketCreate;

export const CommunicationError = () => {
  const {createTicket} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskButtonResultTryAgain
          action={() => createTicket({force: false})}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskButtonResultCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
