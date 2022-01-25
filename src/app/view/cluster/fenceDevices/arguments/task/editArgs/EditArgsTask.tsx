import React from "react";

import { TaskSimple, TaskSimpleFinish, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { EditArgsForm } from "./EditArgsForm";

export const EditArgsTask: React.FC = () => {
  const {
    close,
    name: taskName,
    runUpdate,
    recoverFromError,
    state: {
      fenceDeviceId,
      call: { response, resultMessage },
    },
  } = useTask();

  React.useEffect(() => {
    if (fenceDeviceId === "") {
      close();
    }
  }, [fenceDeviceId, close]);

  return (
    <TaskSimple
      title="Edit fence device arguments"
      task={taskName}
      close={close}
      footer={
        response !== "" ? null : (
          <TaskSimpleFooter runLabel="Save arguments" run={runUpdate} />
        )
      }
      data-test="fence-device-args-edit"
    >
      {response === "" && <EditArgsForm />}
      {response !== "" && (
        <TaskSimpleFinish
          response={response}
          resultMessage={resultMessage}
          waitTitle="Updating fence device arguments"
          successTitle="Fence device arguments updated sucessfully"
          failTitle="Fence device arguments update failed"
          close={close}
          tryAgain={runUpdate}
          recoverFromError={recoverFromError}
        />
      )}
    </TaskSimple>
  );
};
