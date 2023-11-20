import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const ConstraintLocationCreate = () => {
  const {
    close,
    name: taskName,
    label,
    state: {
      call: {response},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel={label}
      close={close}
      task={taskName}
      waitTitle="Creating location constraint"
      response={response}
      footer={<Footer />}
      configure={<Configure />}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.constraintLocationCreate.mark}
    />
  );
};
