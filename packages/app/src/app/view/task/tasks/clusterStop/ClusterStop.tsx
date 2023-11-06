import {testMarks} from "app/view/dataTest";
import {
  TaskButtonCancel,
  TaskButtonNext,
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskFinishError,
  TaskSimpleOldApi,
} from "app/view/share";

import {useTask} from "./useTask";
import {Success} from "./Success";

const {clusterStop: task} = testMarks.task;

export const ClusterStop = () => {
  const {name: taskName, close, clusterStop, state} = useTask();

  const isForceable = state.response === "fail" && state.isForceable;
  const taskLabel = `Stop the cluster ${state.clusterName} on all nodes`;

  return (
    <TaskSimpleOldApi
      title={`${taskLabel}?`}
      taskLabel={taskLabel}
      task={taskName}
      close={close}
      response={state.response}
      waitTitle={`Task "${taskLabel}" in progress`}
      footer={
        <>
          <TaskButtonNext
            run={() => clusterStop({force: false})}
            {...task.run.mark}
          >
            Stop
          </TaskButtonNext>
          <TaskButtonCancel {...task.cancel.mark} />
        </>
      }
      configure={
        <>
          Stop the cluster <strong>{state.clusterName}</strong> on all nodes
        </>
      }
      success={<Success />}
      fail={
        <TaskFinishError
          title={`Task "${taskLabel}" failed`}
          message={`${state.resultMessage}${
            isForceable ? " The error can be overridden." : ""
          }`}
          primaryAction={
            <TaskButtonResult
              label={isForceable ? "Proceed anyway" : "Try again"}
              action={() => clusterStop({force: isForceable})}
              {...task.fail.tryAgain.mark}
            />
          }
          secondaryActions={
            <TaskButtonResultCancel {...task.fail.cancel.mark} />
          }
          {...task.fail.mark}
        />
      }
      {...task.mark}
    />
  );
};
