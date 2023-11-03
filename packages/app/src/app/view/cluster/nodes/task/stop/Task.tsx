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

const {nodeStop: task} = testMarks.task;

export const Task = () => {
  const {name: taskName, close, nodeStop, state} = useTask();

  const isForceable = state.response === "fail" && state.isForceable;
  const taskLabel = "Stop node";

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
            run={() => nodeStop({force: false})}
            {...task.run.mark}
          >
            Stop
          </TaskButtonNext>
          <TaskButtonCancel {...task.cancel.mark} />
        </>
      }
      configure={<>Stop a cluster on the node</>}
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
              action={() => nodeStop({force: isForceable})}
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
