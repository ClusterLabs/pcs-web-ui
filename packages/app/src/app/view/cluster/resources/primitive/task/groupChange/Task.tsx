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
import {GroupChangeForm} from "./GroupChangeForm";

export const Task = () => {
  const {
    isGroupValid,
    isAdjacentResourceValid,
    close,
    name: taskName,
    clusterName,
    changeGroup,
    recoverFromError,
    state: {
      resourceId,
      call: {response, resultMessage},
    },
  } = useTask();

  return (
    <TaskSimpleOldApi
      taskLabel={`Change group of primitive resource "${resourceId}"?`}
      task={taskName}
      clusterName={clusterName}
      close={close}
      waitTitle={`Changing group of primitive resource "${resourceId}"`}
      configure={<GroupChangeForm />}
      footer={
        <TaskSimpleFooter
          nextIf={isGroupValid && isAdjacentResourceValid}
          run={changeGroup}
          runLabel="Change group"
        />
      }
      response={response}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title={`Changing group of primitive resource "${resourceId}" failed`}
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={changeGroup} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
    />
  );
};
