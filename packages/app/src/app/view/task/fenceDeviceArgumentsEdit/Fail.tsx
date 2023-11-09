import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
} from "app/view/share";

import {useTask} from "./useTask";

const {fail} = testMarks.task.fenceDeviceArgumentsEdit;

export const Fail = () => {
  const {
    runUpdate,
    recoverFromError,
    state: {
      call: {resultMessage},
    },
  } = useTask();
  return (
    <TaskFinishError
      title="Fence device arguments update failed"
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
            action={runUpdate}
            {...fail.tryAgain.mark}
          />
          <TaskButtonResultCancel {...fail.cancel.mark} />
        </>
      }
      {...fail.mark}
    />
  );
};
