import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
} from "app/view/share";

import {useTask} from "./useTask";

const {fail} = testMarks.task.constraintLocationCreate;

export const Fail = () => {
  const {
    createOrder,
    recoverFromError,
    state: {
      call: {resultMessage},
    },
  } = useTask();
  return (
    <TaskFinishError
      title="Create order constraint failed"
      message={resultMessage}
      primaryAction={<TaskButtonSimpleResultBack action={recoverFromError} />}
      secondaryActions={
        <>
          <TaskButtonResultTryAgain
            action={createOrder}
            {...fail.tryAgain.mark}
          />
          <TaskButtonResultCancel {...fail.cancel.mark} />
        </>
      }
      {...fail.mark}
    />
  );
};
