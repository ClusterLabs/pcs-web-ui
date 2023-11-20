import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
} from "app/view/share";

import {useTask} from "./useTask";

const {fail} = testMarks.task.permissionEdit;

export const Fail = () => {
  const {
    isCreate,
    permissionEdit,
    recoverFromError,
    state: {
      call: {resultMessage},
    },
  } = useTask();
  return (
    <TaskFinishError
      title={`Permission ${isCreate ? "create" : "update"} failed`}
      message={resultMessage}
      primaryAction={
        <TaskButtonSimpleResultBack
          action={recoverFromError}
          {...fail.back.mark}
        />
      }
      secondaryActions={
        <>
          <TaskButtonResultTryAgain
            action={permissionEdit}
            {...fail.tryAgain.mark}
          />
          <TaskButtonResultCancel {...fail.cancel.mark} />
        </>
      }
      {...fail.mark}
    />
  );
};
