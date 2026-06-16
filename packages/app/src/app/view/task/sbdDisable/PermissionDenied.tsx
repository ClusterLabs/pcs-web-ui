import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibPermissionDenied,
} from "app/view/share";

import {useTask} from "./useTask";

export const PermissionDenied = () => {
  const {sbdDisable} = useTask();
  return (
    <TaskFinishLibPermissionDenied
      tryAgain={
        <TaskButtonResultTryAgain action={() => sbdDisable({force: false})} />
      }
      cancel={<TaskButtonResultCancel />}
    />
  );
};
