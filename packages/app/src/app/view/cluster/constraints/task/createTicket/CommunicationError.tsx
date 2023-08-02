import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

export const CommunicationError = () => {
  const {createTicket} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskResultActionTryAgain action={() => createTicket({force: false})} />
      }
      cancel={<TaskResultActionCancel />}
    />
  );
};
