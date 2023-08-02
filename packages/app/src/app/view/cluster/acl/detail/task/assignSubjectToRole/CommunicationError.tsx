import {
  TaskFinishLibCommunicationError,
  TaskResultActionCancel,
  TaskResultActionTryAgain,
} from "app/view/share";

import {useTask} from "./useTask";

export const CommunicationError = () => {
  const {assign} = useTask();
  return (
    <TaskFinishLibCommunicationError
      tryAgain={<TaskResultActionTryAgain action={assign} />}
      cancel={<TaskResultActionCancel />}
    />
  );
};
