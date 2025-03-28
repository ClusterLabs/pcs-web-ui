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

const {resourceDelete: task} = testMarks.task;

export const ResourceDelete = () => {
  const {name: taskName, close, resourceDelete, state} = useTask();

  const isForceable = state.response === "fail" && state.isForceable;
  const taskLabel = "Delete resource";

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
            run={() => resourceDelete({force: false})}
            {...task.run.mark}
          >
            Delete
          </TaskButtonNext>
          <TaskButtonCancel {...task.cancel.mark} />
        </>
      }
      configure={<>Delete resource</>}
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
              action={() => resourceDelete({force: isForceable})}
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
