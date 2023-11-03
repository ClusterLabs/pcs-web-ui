import {testMarks} from "app/view/dataTest";
import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {Configure} from "./Configure";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const PermissionTask = () => {
  const {
    close,
    name: taskName,
    isCreate,
    label,
    state: {
      call: {response},
    },
  } = useTask();

  return (
    <TaskSimpleOldApi
      taskLabel={label}
      task={taskName}
      close={close}
      configure={<Configure />}
      footer={<Footer />}
      response={response}
      waitTitle={`${isCreate ? "Creating" : "Updating"} permission`}
      success={<Success />}
      fail={<Fail />}
      {...testMarks.task.permissionEdit.mark}
    />
  );
};
