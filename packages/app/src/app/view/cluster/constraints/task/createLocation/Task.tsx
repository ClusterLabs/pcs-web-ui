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
    createLocation,
    recoverFromError,
    isScoreValid,
    isResourceValid,
    isPatternValid,
    isNodeValid,
    isRuleValid,
    state: {
      call: {response, resultMessage},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel="Create location constraint"
      close={close}
      task={taskName}
      clusterName={clusterName}
      waitTitle="Creating location constraint"
      footer={
        <TaskSimpleFooter
          nextIf={
            isScoreValid
            && isResourceValid
            && isPatternValid
            && isNodeValid
            && isRuleValid
          }
          run={createLocation}
          runLabel="Create location constraint"
        />
      }
      configure={<Configure />}
      response={response}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title="Create location constraint failed"
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={createLocation} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
    />
  );
};
