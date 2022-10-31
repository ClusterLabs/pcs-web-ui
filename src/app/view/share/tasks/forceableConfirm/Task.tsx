import React from "react";

import { Action } from "app/store";
import {
  TaskFinishError,
  TaskProgress,
  TaskSimple,
  TaskSimpleFooter,
  TaskSuccess,
} from "app/view/share";

import { useTask } from "./useTask";

export const TaskComponent = ({
  confirm,
  runLabel,
  processTitle,
  getForceableAction,
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
  getForceableAction: (_props: { force: boolean }) => Action;
}) => {
  const {
    close,
    runAction,
    state: { response, resultMessage },
  } = useTask();

  const isForceable = resultMessage.includes("--force");

  return (
    <TaskSimple
      title={confirm.title}
      task="forceableConfirm"
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter
            run={() => runAction(getForceableAction({ force: false }))}
            runLabel={runLabel}
          />
        )
      }
    >
      {response === "" && confirm.description}
      {response === "sending" && <TaskProgress title={processTitle.wait} />}
      {response === "ok" && <TaskSuccess title={processTitle.success} />}
      {response === "fail" && (
        <TaskFinishError
          title={processTitle.fail}
          message={`${resultMessage}${
            isForceable ? " The error can be overriden." : ""
          }`}
          primaryAction={[
            isForceable ? "Proceed anyway" : "Try again",
            () => runAction(getForceableAction({ force: isForceable })),
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
