import React from "react";

import {testMarks} from "app/view/dataTest";
import {Action} from "app/store";
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

const {forceableConfirm: task} = testMarks.task;

export const TaskComponent = ({
  description,
  runLabel,
  taskLabel,
  getForceableAction,
}: {
  description: React.ReactNode;
  runLabel: string;
  taskLabel: string;
  getForceableAction: (_props: {force: boolean}) => Action;
  "data-test"?: string;
}) => {
  const {close, runAction, state} = useTask();

  const isForceable = state.response === "fail" && state.isForceable;

  return (
    <TaskSimpleOldApi
      title={`${taskLabel}?`}
      taskLabel={taskLabel}
      task="forceableConfirm"
      clusterName={null}
      close={close}
      response={state.response}
      waitTitle={`Task "${taskLabel}" in progress`}
      footer={
        <>
          <TaskButtonNext
            run={() => runAction(getForceableAction({force: false}))}
            {...task.run.mark}
          >
            {runLabel}
          </TaskButtonNext>
          <TaskButtonCancel {...task.cancel.mark} />
        </>
      }
      configure={description}
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
              action={() => runAction(getForceableAction({force: isForceable}))}
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

export const Task = (props: React.ComponentProps<typeof TaskComponent>) => {
  const ConfiguredTask = () => {
    return <TaskComponent {...props} />;
  };

  return ConfiguredTask;
};
