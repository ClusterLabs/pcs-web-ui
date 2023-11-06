import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const ConstraintOrderCreate = () => {
  const {
    close,
    label,
    name: taskName,
    state: {
      call: {response},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel={label}
      task={taskName}
      close={close}
      waitTitle="Creating order constraint"
      configure={<Configure />}
      footer={<Footer />}
      response={response}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.constraintOrderCreate.mark}
    />
  );
};
