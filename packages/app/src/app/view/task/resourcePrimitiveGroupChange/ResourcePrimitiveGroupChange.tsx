import {TaskSimpleOldApi} from "app/view/share";

import {useTask} from "./useTask";
import {GroupChangeForm} from "./GroupChangeForm";
import {Footer} from "./Footer";
import {Success} from "./Success";
import {Fail} from "./Fail";

export const ResourcePrimitiveGroupChange = () => {
  const {
    close,
    name: taskName,
    state: {
      resourceId,
      call: {response},
    },
  } = useTask();

  return (
    <TaskSimpleOldApi
      taskLabel={`Change group of primitive resource "${resourceId}"?`}
      task={taskName}
      close={close}
      waitTitle={`Changing group of primitive resource "${resourceId}"`}
      configure={<GroupChangeForm />}
      footer={<Footer />}
      response={response}
      success={<Success />}
      fail={<Fail />}
    />
  );
};
