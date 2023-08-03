import {testMarks} from "app/view/dataTest";
import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

const {communicationError} = testMarks.task.constraintTicketCreate;

export const CommunicationError = () => {
  const {createTicket} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskResultActionTryAgain
          action={() => createTicket({force: false})}
          {...communicationError.tryAgain.mark}
        />
      }
      cancel={<TaskResultActionCancel {...communicationError.cancel.mark} />}
      {...communicationError.mark}
    />
  );
};
