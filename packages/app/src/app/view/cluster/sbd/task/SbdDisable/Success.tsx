import {testMarks} from "app/view/dataTest";
import {TaskResultAction, TaskSuccess} from "app/view/share";

const {success} = testMarks.task.sbdDisable;

export const Success = () => {
  return (
    <TaskSuccess
      primaryAction={<TaskResultAction {...success.close.mark} />}
      {...success.mark}
    />
  );
};
