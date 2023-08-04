import {
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskButtonResultTryAgain,
  TaskButtonSimpleResultBack,
  TaskFinishError,
  TaskSimpleFooter,
  TaskSimpleOldApi,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";

export const Task = () => {
  const {
    close,
    name: taskName,
    clusterName,
    createOrder,
    recoverFromError,
    isFirstResourceValid,
    isThenResourceValid,
    isScoreValid,
    state: {
      call: {response, resultMessage},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel="Create order constraint"
      task={taskName}
      clusterName={clusterName}
      close={close}
      waitTitle="Creating order constraint"
      configure={<Configure />}
      footer={
        <TaskSimpleFooter
          nextIf={isFirstResourceValid && isThenResourceValid && isScoreValid}
          run={createOrder}
          runLabel="Create order constraint"
        />
      }
      response={response}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title="Create order constraint failed"
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={createOrder} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
    />
  );
};
