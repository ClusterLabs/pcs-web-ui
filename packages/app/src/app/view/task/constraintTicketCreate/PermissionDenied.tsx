import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibPermissionDenied,
} from "app/view/share";

import {useTask} from "./useTask";

export const PermissionDenied = () => {
  const {createTicket} = useTask();
  return (
    <TaskFinishLibPermissionDenied
      tryAgain={
        <TaskButtonResultTryAgain action={() => createTicket({force: false})} />
      }
      cancel={<TaskButtonResultCancel />}
    />
  );
};
