import React from "react";

import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {EditArgsForm} from "./EditArgsForm";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const PrimitiveAttrsEdit = () => {
  const {
    close,
    name: taskName,
    state: {
      resourceId,
      call: {response},
    },
  } = useTask();

  React.useEffect(() => {
    if (resourceId === "") {
      close();
    }
  }, [resourceId, close]);

  return (
    <TaskSimpleOldApi
      taskLabel="Edit resource instance attributes"
      task={taskName}
      close={close}
      waitTitle="Updating resource instance attributes"
      footer={<Footer />}
      configure={<EditArgsForm />}
      response={response}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.primitiveAttrsEdit.mark}
    />
  );
};
