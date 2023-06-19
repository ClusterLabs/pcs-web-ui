import React from "react";

import {Action} from "app/store";
import {
  TaskFinishError,
  TaskProgress,
  TaskResultAction,
  TaskSimple,
  TaskSimpleFooter,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

export const TaskComponent = ({
  description,
  runLabel,
  taskLabel,
  getForceableAction,
  "data-test": dataTest,
}: {
  description: React.ReactNode;
  runLabel: string;
  taskLabel: string;
  getForceableAction: (_props: {force: boolean}) => Action;
  "data-test"?: string;
}) => {
  const {close, runAction, state} = useTask();

  return (
    <TaskSimple
      title={`${taskLabel}?`}
      taskLabel={taskLabel}
      task="forceableConfirm"
      clusterName={null}
      close={close}
      footer={
        state.response !== "" ? null : (
          <TaskSimpleFooter
            run={() => runAction(getForceableAction({force: false}))}
            runLabel={runLabel}
          />
        )
      }
      data-test={`forceable-confirm${dataTest ? "-" + dataTest : ""}`}
    >
      {state.response === "" && description}
      {state.response === "sending" && (
        <TaskProgress title={`Task "${taskLabel}" in progress`} />
      )}
      {state.response === "ok" && (
        <TaskSuccess primaryAction={<TaskResultAction />} />
      )}
      {state.response === "fail" && (
        <TaskFinishError
          title={`Task "${taskLabel}" failed`}
          message={`${state.resultMessage}${
            state.isForceable ? " The error can be overridden." : ""
          }`}
          primaryAction={
            <TaskResultAction
              label={state.isForceable ? "Proceed anyway" : "Try again"}
              action={() =>
                runAction(getForceableAction({force: state.isForceable}))
              }
            />
          }
          secondaryActions={
            <TaskResultAction variant="secondary" label="Cancel" />
          }
        />
      )}
    </TaskSimple>
  );
};

export const Task = (props: React.ComponentProps<typeof TaskComponent>) => {
  const ConfiguredTask = () => {
    return <TaskComponent {...props} />;
  };

  return ConfiguredTask;
};
