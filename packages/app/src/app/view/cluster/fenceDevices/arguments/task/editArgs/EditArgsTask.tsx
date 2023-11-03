import React from "react";

import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {EditArgsForm} from "./EditArgsForm";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const EditArgsTask = () => {
  const {
    close,
    name: taskName,
    state: {
      fenceDeviceId,
      call: {response},
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
      close={close}
      waitTitle="Updating fence device arguments"
      footer={<Footer />}
      configure={<EditArgsForm />}
      response={response}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.fenceDeviceArgumentsEdit.mark}
    />
  );
};
