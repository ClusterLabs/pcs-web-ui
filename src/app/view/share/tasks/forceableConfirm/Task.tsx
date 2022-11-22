import React from "react";

import {Action} from "app/store";
import {
  TaskFinishError,
  TaskProgress,
  TaskSimple,
  TaskSimpleFooter,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

export const TaskComponent = ({
  confirm,
  runLabel,
  processTitle,
  getForceableAction,
  "data-test": dataTest,
}: {
  confirm: {
    title: string;
    description: React.ReactNode;
  };
  runLabel: string;
  processTitle: {
    wait: React.ReactNode;
    success: React.ReactNode;
    fail: React.ReactNode;
  };
  getForceableAction: (_props: {force: boolean}) => Action;
  "data-test"?: string;
}) => {
  const {close, runAction, state} = useTask();

  return (
    <TaskSimple
      title={confirm.title}
      task="forceableConfirm"
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
      {state.response === "" && confirm.description}
      {state.response === "sending" && (
        <TaskProgress title={processTitle.wait} />
      )}
      {state.response === "ok" && <TaskSuccess title={processTitle.success} />}
      {state.response === "fail" && (
        <TaskFinishError
          title={processTitle.fail}
          message={`${state.resultMessage}${
            state.isForceable ? " The error can be overriden." : ""
          }`}
          primaryAction={[
            state.isForceable ? "Proceed anyway" : "Try again",
            () => runAction(getForceableAction({force: state.isForceable})),
          ]}
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
