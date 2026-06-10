import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibPermissionDenied,
} from "app/view/share";

import {useTask} from "./useTask";

export const PermissionDenied = () => {
  const {assign} = useTask();
  return (
    <TaskFinishLibPermissionDenied
      tryAgain={<TaskButtonResultTryAgain action={assign} />}
      cancel={<TaskButtonResultCancel />}
    />
  );
};
