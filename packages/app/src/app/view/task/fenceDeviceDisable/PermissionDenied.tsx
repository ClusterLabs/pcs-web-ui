import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskFinishLibPermissionDenied,
} from "app/view/share";

import {useTask} from "./useTask";

export const PermissionDenied = () => {
  const {disableFenceDevice} = useTask();
  return (
    <TaskFinishLibPermissionDenied
      tryAgain={
        <TaskButtonResultTryAgain
          action={() => disableFenceDevice({force: false})}
        />
      }
      cancel={<TaskButtonResultCancel />}
    />
  );
};
