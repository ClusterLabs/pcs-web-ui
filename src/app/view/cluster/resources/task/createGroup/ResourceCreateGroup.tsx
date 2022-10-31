import {TaskSimple} from "app/view/share";

import {useTask} from "./useTask";
import {Form} from "./Form";
import {Finish} from "./Finish";
import {Footer} from "./Footer";

export const ResourceCreateGroup = () => {
  const {
    close,
    name: taskName,
    state: {response},
  } = useTask();

  return (
    <TaskSimple
      title="Create group"
      task={taskName}
      close={close}
      footer={<Footer />}
    >
      {response !== "success" && <Form />}
      {response === "success" && <Finish />}
    </TaskSimple>
  );
};
