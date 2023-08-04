import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const Task = () => {
  const {
    close,
    name: taskName,
    label,
    clusterName,
    state: {
      call: {response},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel={label}
      close={close}
      task={taskName}
      clusterName={clusterName}
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
