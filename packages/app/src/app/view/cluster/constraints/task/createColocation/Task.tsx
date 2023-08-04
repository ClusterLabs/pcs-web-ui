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
    createColocation,
    recoverFromError,
    isResourceValid,
    isWithResourceValid,
    isScoreValid,
    state: {
      call: {response, resultMessage},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel="Create colocation constraint"
      task={taskName}
      clusterName={clusterName}
      waitTitle="Creating colocation constraint"
      close={close}
      footer={
        <TaskSimpleFooter
          nextIf={isResourceValid && isWithResourceValid && isScoreValid}
          run={createColocation}
          runLabel="Create colocation constraint"
        />
      }
      configure={<Configure />}
      response={response}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title="Create colocation constraint failed"
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={createColocation} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
    />
  );
};
