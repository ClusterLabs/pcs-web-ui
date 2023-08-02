import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

export const CommunicationError = () => {
  const {sbdDisable} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={
        <TaskResultActionTryAgain action={() => sbdDisable({force: false})} />
      }
      cancel={<TaskResultActionCancel />}
    />
  );
};
