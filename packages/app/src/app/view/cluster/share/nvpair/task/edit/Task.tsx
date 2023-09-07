import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Fail} from "./Fail";
import {Success} from "./Success";

export const Task = () => {
  const {
    close,
    label,
    attrDesc,
    isCreate,
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
      close={close}
      waitTitle={`${isCreate ? "Creating" : "Updating"} ${attrDesc}`}
      footer={<Footer />}
      response={response}
      configure={<Configure />}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.nvsetEdit.mark}
    />
  );
};
