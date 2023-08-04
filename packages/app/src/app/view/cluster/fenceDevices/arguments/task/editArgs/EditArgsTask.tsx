import React from "react";

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
import {EditArgsForm} from "./EditArgsForm";

export const EditArgsTask = () => {
  const {
    close,
    name: taskName,
    clusterName,
    runUpdate,
    recoverFromError,
    state: {
      fenceDeviceId,
      call: {response, resultMessage},
    },
  } = useTask();

  React.useEffect(() => {
    if (fenceDeviceId === "") {
      close();
    }
  }, [fenceDeviceId, close]);

  return (
    <TaskSimpleOldApi
      taskLabel="Edit fence device arguments"
      task={taskName}
      clusterName={clusterName}
      close={close}
      waitTitle="Updating fence device arguments"
      footer={<TaskSimpleFooter runLabel="Save arguments" run={runUpdate} />}
      configure={<EditArgsForm />}
      response={response}
      success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
      fail={
        <TaskFinishError
          title="Fence device arguments update failed"
          message={resultMessage}
          primaryAction={
            <TaskButtonSimpleResultBack action={recoverFromError} />
          }
          secondaryActions={
            <>
              <TaskButtonResultTryAgain action={runUpdate} />
              <TaskButtonResultCancel />
            </>
          }
        />
      }
      data-test="fence-device-args-edit"
    />
  );
};
