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
    label,
    name: taskName,
    clusterName,
    state: {
      call: {response},
    },
  } = useTask();
  return (
    <TaskSimpleOldApi
      taskLabel={label}
      task={taskName}
      clusterName={clusterName}
      waitTitle="Creating colocation constraint"
      close={close}
      footer={<Footer />}
      configure={<Configure />}
      response={response}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.constraintColocationCreate.mark}
    />
  );
};
