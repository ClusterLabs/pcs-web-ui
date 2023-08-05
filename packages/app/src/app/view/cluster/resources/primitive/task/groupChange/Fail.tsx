import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
} from "app/view/share";

import {useTask} from "./useTask";

const {fail} = testMarks.task.resourcePrimitiveGroupChange;

export const Fail = () => {
  const {
    changeGroup,
    recoverFromError,
    state: {
      resourceId,
      call: {resultMessage},
    },
  } = useTask();
  return (
    <TaskFinishError
      title={`Changing group of primitive resource "${resourceId}" failed`}
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
            action={changeGroup}
            {...fail.tryAgain.mark}
          />
          <TaskButtonResultCancel {...fail.cancel.mark} />
        </>
      }
      {...fail.mark}
    />
  );
};
